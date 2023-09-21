import styled from "styled-components";
import { useRouter } from "next/navigation";

const Card = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding-left: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 48px;
  border-bottom: 2px solid gainsboro;
  h3 {
    font-size: 14px;
    font-weight: 400;
  }
`;

const MainText = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const SubscriptionCard = (props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    // router.push({pathname: `${props.id}`, query: {id: props.id}});
    // router.push(`${[props.id]}?id=${props.id}`);
    router.push(`${[props.id]}?id=${props.id}`)
    // router.push({
    //   pathname: `${props.id}`,
    //   query: { subscriptionId: props.id },
    // })
    // router.push(`${props.id}`)
    console.log("clicked");
  };

  return (
    <Card onClick={handleButtonClick}>
      <div>
        <img src={`./logo/${props.name}.svg`} />
        <p>{props.name}</p>
      </div>
      <div>
        <h3>Konstnad</h3>
        <MainText>{props.cost} Sek</MainText>
        <p>/Månad</p>
      </div>
      <div>
        <h3>Förnyas om</h3>
        <MainText>20</MainText>
        <p>Dagar</p>
      </div>
    </Card>
  );
};

export default SubscriptionCard;
