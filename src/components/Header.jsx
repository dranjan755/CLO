import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gray};
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 -1px 0 0 ${({ theme }) => theme.colors.border} inset;
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: ${({ theme }) => theme.fonts.primary};

  nav {
    display: flex;
    gap: 32px;

    a {
      color: ${({ theme }) => theme.colors.gray};
      text-transform: uppercase;
      font-size: 1.4rem;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => theme.colors.accent};
      }
    }

    .active {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  .buttons {
    display: flex;
    gap: 20px;

    button {
      border: 1px solid ${({ theme }) => theme.colors.text};
      color: ${({ theme }) => theme.colors.text};
      background: transparent;
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.accent};
        border-color: ${({ theme }) => theme.colors.accent};
      }
    }
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <div className="logo">CONNECT</div>
      {/* <nav>
        <a href="/" className="active">Store</a>
        <a href="/">Gallery</a>
        <a href="/">Contest</a>
        <a href="/">Community</a>
        <a href="/">Apps</a>
      </nav> */}
      <div className="buttons">
        <button>SIGN IN</button>
        <button>SIGN UP</button>
      </div>
    </HeaderWrapper>
  );
}
