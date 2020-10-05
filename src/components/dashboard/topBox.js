import styled from 'styled-components';

export const TopBox = styled.div`
    width: ${props => props.width || '14vw'};
    height: 10vh;
    width: 150px;
    margin-bottom: 2%;
    background-color: ${props => props.backgroundColor || '#051a23'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color ?? '#eee'};
    box-shadow: 0 0 1px 0px #0a2835;
    border: 1pt solid #ffffff;
    font-variant-caps: all-petite-caps;
    font-weight: bold;
    flex-direction: column;
    animation: slideInUp .7s;
    margin: 1%;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  *{
    user-select: none;
  }
  .description{
    font-size:11pt;
    color: #eee;
  }
  .result{
    display: flex;
    align-items: center;
      span{
        &.label{
            font-size: 0.7em;
            color: #eee;
        }
        &.value{
          font-size: 2rem;
          text-shadow: #000 1px 1px 1px;
      }
    }
  }
   
      @keyframes slideInUp {
        from {
          -webkit-transform: translate3d(0, 100%, 0);
          transform: translate3d(0, 100px, 0);
          visibility: visible;
        }
      
        to {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
      }
`;

export default TopBox;