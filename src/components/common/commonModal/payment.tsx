import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Script from "next/script";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { amountState } from "../store";

const CREATE_BUTTON = gql`
  mutation createButton($imp_uid: String!, $amount: Int!) {
    createButton(imp_uid: $imp_uid, amount: $amount) {
      id
      imp_uid
      amount
    }
  }
`;

const PaymentH1 = styled.h1`
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
  margin-top: 41px;
  margin-right: 17.1rem;
  margin-left: 17.1rem;
`;

const PaymentWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaymentButtonDiv = styled.div`
  height: 30px;
  line-height: 30px;
  background: rgba(238, 238, 238, 0.5);
  border-radius: 20px;
  padding: 0px 15px;
  margin-bottom: 30px;
  font-size: 16px;
`;

const PaymenetSpan = styled.span`
  font-weight: 400;
  font-size: 16px;
  margin: 4px, 9px;
`;

const PaymentButtonLineDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

const PaymentListSpan = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 1rem;
  padding-left: 10px;
`;

const PaymentListButton = styled.button`
  width: 7rem;
  height: 3rem;
  background: #fff2b2;
  border-radius: 7px;
  margin-bottom: 1rem;
  margin-right: 10px;
  text-align: center;
`;

const PaymentColumnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 1.5rem;
`;
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
declare const window: typeof globalThis & {
  IMP: any;
};

const Payment = (props) => {
  const { setModalOpen } = props;
  const [createButton] = useMutation(CREATE_BUTTON);
  const { data } = useQuery(FETCH_USER);

  const requestPay = (amount) => {
    const IMP = window.IMP;
    IMP.init("imp47402041"); // ????????? ????????????
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        // ????????? ????????? ?????? ???????????? ??????
        // merchant_uid: "ORD20180131-0000011",
        name: "????????? ????????? ??????",
        amount: Number(amount),
        buyer_email: "alsqjarlwkd@gmail.com",
        buyer_name: "?????????",
        buyer_tel: "010-4699-6819",
        buyer_addr: "??????????????? ????????? ?????????",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/secondhandmarket",
      },
      async (rsp: any) => {
        if (rsp.success) {
          try {
            const buyPointResult = await createButton({
              variables: {
                imp_uid: String(rsp.imp_uid),
                amount: Number(amount),
              },
              refetchQueries: [
                {
                  query: FETCH_USER,
                },
              ],
            });
            toast.success("?????? ??????!", {
              icon: "????",
            });
            setModalOpen(false);
          } catch (error: any) {
            toast.error(error.message, {
              icon: "????",
            });
          }
        } else {
          toast.error("????????? ???????????????!", {
            icon: "????",
          });
          toast.error("?????? ??????????????????", {
            icon: "????",
          });
          setModalOpen(false);
        }
      }
    );
  };

  return (
    <PaymentWrapperDiv>
      <Script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></Script>
      <Script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></Script>
      <PaymentH1>????????? ???????????????</PaymentH1>
      <PaymentButtonDiv>
        ????????? ??????&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: "800" }}>{data?.fetchUser.button}</span>???
      </PaymentButtonDiv>

      <PaymentButtonLineDiv>
        <PaymentColumnDiv>
          <PaymentListSpan>?????? 10???</PaymentListSpan>
          <PaymentListButton onClick={() => requestPay(1000)}>1000???</PaymentListButton>
        </PaymentColumnDiv>
        <PaymentColumnDiv>
          <PaymentListSpan>?????? 30???</PaymentListSpan>
          <PaymentListButton onClick={() => requestPay(3000)}>3000???</PaymentListButton>
        </PaymentColumnDiv>
        <PaymentColumnDiv>
          <PaymentListSpan>?????? 50???</PaymentListSpan>
          <PaymentListButton onClick={() => requestPay(5000)}>5000???</PaymentListButton>
        </PaymentColumnDiv>
        <PaymentColumnDiv>
          <PaymentListSpan>?????? 100???</PaymentListSpan>
          <PaymentListButton onClick={() => requestPay(10000)}>10000???</PaymentListButton>
        </PaymentColumnDiv>
        <PaymentColumnDiv>
          <PaymentListSpan>?????? 150???</PaymentListSpan>
          <PaymentListButton onClick={() => requestPay(15000)}>15000???</PaymentListButton>
        </PaymentColumnDiv>
      </PaymentButtonLineDiv>
    </PaymentWrapperDiv>
  );
};

export default Payment;
