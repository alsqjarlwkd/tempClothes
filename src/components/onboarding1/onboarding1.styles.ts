import styled from "@emotion/styled";

interface OnBoarding1 {
  isSelected: any;
  value: any;
}

export const WrapperDiv = styled.div`
  height: 93.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.26) 52.07%, rgba(183, 229, 118, 0.34) 100%);
`;
export const ItemWrapperDiv = styled.div`
  width: 50rem;
  height: 53.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 6px 9px 16px -1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const QuestionDiv = styled.div`
  font-size: 1.9rem;
  margin-top: 9.5rem;
  margin-bottom: 4rem;
`;
export const ButtonDiv = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 22.1rem;
`;
export const ManButton = styled.button`
  width: 8rem;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.6rem;
  background-color: ${(props: OnBoarding1) => (props.isSelected === props.value ? "#fff2b2;" : "#fff")};
  border-radius: 30px;
  border: ${(props: OnBoarding1) => (props.isSelected === props.value ? "1px solid #ffdd87" : "1px solid #bebebe")};
  :hover {
    border: 1px solid #ffdd87;
    background-color: #fff2b2;
  }
  cursor: pointer;
`;
export const AreYouUserDiv = styled.div`
  width: 19.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4.6rem;
`;
export const AlreadyUserDiv = styled.div`
  font-size: 1.2rem;
  color: #7e7272;
`;
export const GoToLoginDiv = styled.div`
  font-size: 1.2rem;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;
export const PrevNextDiv = styled.div`
  width: 38.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;
export const PrevImg = styled.img`
  width: 1.68rem;
  height: 1.68rem;
  background-color: white;
  font-size: 2rem;
  color: #bebebe;
  cursor: pointer;
`;
export const NextImg = styled.img`
  width: 1.68rem;
  height: 1.68rem;
  background-color: white;
  font-size: 2rem;
  color: #bebebe;
  cursor: pointer;
`;
