import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import MyPageEditInfoPresenter from "./MyPageEditInfoPresenter";
import { CONFIRM_AUTH_NUMBER, CREATE_PHONE_AUTH, UPDATE_USER } from "./MyPageEditInfoQuries";
import { useRecoilState } from "recoil";
import { timerState } from "../../common/store";
import { useRouter } from "next/router";
import { CONFIRM_OVERLAP_EMAIL, CONFIRM_OVERLAP_NIC } from "../../signup/signup.quries";
import { toast } from "react-toastify";
import { ChangeEvent, MouseEvent } from "react";

const MyPageEditInfoContainter = () => {
  const [inputs, setInputs] = useState({
    nickname: "",
    email: "",
    phone: "",
    authNumber: "",
    region: "",
    style: "",
  });
  const router = useRouter();
  const [m_updateUser] = useMutation(UPDATE_USER);
  const [m_authNumber] = useMutation(CONFIRM_AUTH_NUMBER);
  const [m_overLapEmail] = useMutation(CONFIRM_OVERLAP_EMAIL);
  const [m_overLapNic] = useMutation(CONFIRM_OVERLAP_NIC);
  const [m_phoneAuth] = useMutation(CREATE_PHONE_AUTH);
  const [authOk, setAuthFalse] = useState(false);
  const [, setSendAuthNumber] = useRecoilState(timerState);

  const handleInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickEventTag = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.id === "style") {
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

  const updateUserEditInfo = async () => {
    try {
      await m_updateUser({
        variables: {
          updateUserInput: {
            email: inputs.email,
            phone: inputs.phone,
            style: inputs.style,
            nickname: inputs.nickname,
            regionId: inputs.region,
          },
        },
      });
      toast.success("???????????? ?????? ??????!", {
        icon: "????",
      });
      router.push("/login");
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
      alert("??????????????? ?????? ????????? ?????????!");
      return;
    }
    try {
      await m_authNumber({
        variables: {
          authNumber: inputs.authNumber,
        },
      });
      toast.success("?????? ??????!", {
        icon: "????",
      });
      setAuthFalse(true);
      setSendAuthNumber(false);
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

  return (
    <MyPageEditInfoPresenter
      handleInfo={handleInfo}
      onClickEventTag={onClickEventTag}
      updateUserEditInfo={updateUserEditInfo}
      createPhoneAuth={createPhoneAuth}
      confirmAuthNumber={confirmAuthNumber}
      overLapId={overLapId}
      overLapNic={overLapNic}
      authOk={authOk}
      inputs={inputs}
    ></MyPageEditInfoPresenter>
  );
};

export default MyPageEditInfoContainter;
