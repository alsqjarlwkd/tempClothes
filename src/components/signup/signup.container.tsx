import { gql, useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import SignupUI from "./signup.presenter";
import { useRouter } from "next/router";
import { CREATE_USER, CONFIRM_OVERLAP_EMAIL, CONFIRM_OVERLAP_NIC, CONFIRM_AUTH_NUMBER, CREATE_PHONE_AUTH, UPDATE_USER } from "./signup.quries";
import { useRecoilState } from "recoil";
import { authState, timerState } from "../common/store";
import { toast } from "react-toastify";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMutationConfirmOverlapEmailArgs,
  IMutationConfirmOverlapNicArgs,
  IMutationConfirmAuthNumberArgs,
  IMutationCreatePhoneAuthArgs,
  IMutationUpdateUserArgs,
} from "../types/types";
import { boolean } from "yup";
import { IQuery } from "../types/types";

const FETCH_USER = gql`
  query {
    fetchUser {
      id
      email
      phone
      gender
      style
      nickname
      userImgURL
      button
      region {
        id
        lat
        lon
      }
      deletedAt
    }
  }
`;

export default function Signup() {
  const router = useRouter();
  const [m_createUser] = useMutation<Pick<IMutation, "createUser">, IMutationCreateUserArgs>(CREATE_USER);
  const [m_overLapEmail] = useMutation<Pick<IMutation, "confirmOverlapEmail">, IMutationConfirmOverlapEmailArgs>(CONFIRM_OVERLAP_EMAIL);
  const [m_overLapNic] = useMutation<Pick<IMutation, "confirmOverlapNic">, IMutationConfirmOverlapNicArgs>(CONFIRM_OVERLAP_NIC);
  const [m_authNumber] = useMutation<Pick<IMutation, "confirmAuthNumber">, IMutationConfirmAuthNumberArgs>(CONFIRM_AUTH_NUMBER);
  const [m_phoneAuth] = useMutation<Pick<IMutation, "createPhoneAuth">, IMutationCreatePhoneAuthArgs>(CREATE_PHONE_AUTH);
  const [m_updateUser] = useMutation<Pick<IMutation, "updateUser">, IMutationUpdateUserArgs>(UPDATE_USER);
  const [authOk, setAuthFalse] = useRecoilState<boolean>(authState);
  const [, setSendAuthNumber] = useRecoilState<boolean>(timerState);
  const { data: socialLoginData } = useQuery<Pick<IQuery, "fetchUser">>(FETCH_USER);

  const [inputs, setInputs] = useState({
    nickname: " ",
    email: " ",
    password: " ",
    passwordOk: " ",
    phone: " ",
    authNumber: " ",
    gender: " ",
    style: " ",
    region: " ",
  });
  const [clickGender, setClickGender] = useState("");
  const [clickStyle, setClickStyle] = useState("");
  const [clickRegion, setClickRegion] = useState("");

  const handleSignUpInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const signUpFunc = async () => {
    if (authOk) {
      try {
        await m_createUser({
          variables: {
            createUserInput: {
              regionId: inputs.region,
              email: inputs.email,
              password: inputs.password,
              phone: inputs.phone,
              gender: inputs.gender,
              style: inputs.style,
              nickname: inputs.nickname,
            },
          },
        });
        toast.success("?????? ?????? ??????!", {
          icon: "????",
        });
        router.push("/login");
      } catch (error) {
        toast.error(error.message, {
          icon: "????",
        });
      }
    } else if (!authOk) {
      toast.error("?????? ????????? ????????? ?????????!", {
        icon: "????",
      });
    }
  };

  const updateUserFunc = async () => {
    try {
      await m_updateUser({
        variables: {
          updateUserInput: {
            regionId: inputs.region,
            phone: inputs.phone,
            gender: inputs.gender,
            style: inputs.style,
            nickname: inputs.nickname,
          },
        },
      });
      toast.success("?????? ?????? ??????!", {
        icon: "????",
      });
      router.push("/login");
    } catch (error) {
      toast.error(error.message, {
        icon: "????",
      });
    }
  };

  const overLapId = async () => {
    try {
      await m_overLapEmail({
        variables: {
          email: inputs.email,
        },
      });
      toast.success("?????? ????????? ??????????????????!", {
        icon: "????",
      });
    } catch (error) {
      toast.error(error.message, {
        icon: "????",
      });
    }
  };

  const overLapNic = async () => {
    try {
      await m_overLapNic({
        variables: {
          nickname: inputs.nickname,
        },
      });
      toast.success("?????? ????????? ??????????????????!", {
        icon: "????",
      });
    } catch (error) {
      toast.error(error.message, {
        icon: "????",
      });
    }
  };

  const createPhoneAuth = async () => {
    try {
      await m_phoneAuth({
        variables: {
          phone: inputs.phone,
        },
      });

      toast.success("???????????? ?????? ??????!", {
        icon: "????",
      });
      setSendAuthNumber(true);
    } catch (error) {
      toast.error(error.message, {
        icon: "????",
      });
    }
  };

  const confirmAuthNumber = async () => {
    if (inputs.authNumber.length !== 6) {
      toast.error("??????????????? ?????? ????????? ?????????!", {
        icon: "????",
      });
      return;
    }
    const authNumberResult = await m_authNumber({
      variables: {
        authNumber: inputs.authNumber,
      },
    });

    if (authNumberResult?.data.confirmAuthNumber === "??????????????? ?????? ????????? ?????????.") {
      toast.error("??????????????? ?????? ????????? ?????????.", {
        icon: "????",
      });
    } else {
      toast.success("?????? ??????!", {
        icon: "????",
      });
      setSendAuthNumber(false);
      setAuthFalse(true);
    }
  };

  const onClickEventTag = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    if (target.id === "style") {
      setInputs({
        ...inputs,
        [target.id]: target.innerText,
      });
    }

    if (target.id === "gender") {
      setInputs({
        ...inputs,
        [target.id]: target.innerText,
      });
    }

    if (target.id === "region") {
      setInputs({
        ...inputs,
        [target.id]: target.innerText,
      });
    }
  };

  const onClickTagGender = (id: string) => {
    setClickGender(id);
  };

  const onClickTagStyle = (id: string) => {
    setClickStyle(id);
  };

  const onClickRegion = (id: string) => {
    setClickRegion(id);
  };

  return (
    <SignupUI
      handleSignUpInputs={handleSignUpInputs}
      signUpFunc={signUpFunc}
      onClickEventTag={onClickEventTag}
      overLapId={overLapId}
      overLapNic={overLapNic}
      inputs={inputs}
      createPhoneAuth={createPhoneAuth}
      confirmAuthNumber={confirmAuthNumber}
      socialLoginData={socialLoginData}
      updateUserFunc={updateUserFunc}
      onClickTagGender={onClickTagGender}
      onClickTagStyle={onClickTagStyle}
      clickGender={clickGender}
      clickStyle={clickStyle}
      onClickRegion={onClickRegion}
      clickRegion={clickRegion}
    />
  );
}
