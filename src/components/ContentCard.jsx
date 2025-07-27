import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  border-radius: 10px 10px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-in-out, filter 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.1);
    filter: brightness(0.9);
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.cardBg};

  .left {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .creator {
      color: ${({ theme }) => theme.colors.gray};
      font-size: 0.85rem;
    }
    .title {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.05rem;
    }
  }

  .price {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1rem;
  }
`;

const getPricingLabel = (pricingOption, price) => {
  switch (pricingOption) {
    case 0:
      return `$${price || 0}`;
    case 1:
      return 'Free';
    case 2:
      return 'View Only';
    default:
      return 'Unknown';
  }
};

export default function ContentCard({ item }) {
  return (
    <Card>
      <ImageWrapper>
        <img src={item.imagePath || item.photo} alt={item.title} />
      </ImageWrapper>
      <InfoRow>
        <div className="left">
          <span className="creator">{item.userName}</span>
          <span className="title">{item.title}</span>
        </div>
        <div className="price">
          {getPricingLabel(item.pricingOption, item.price)}
        </div>
      </InfoRow>
    </Card>
  );
}
