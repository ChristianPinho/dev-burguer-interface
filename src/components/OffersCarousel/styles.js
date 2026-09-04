import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 30px;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #61A120;
  padding-bottom: 12px;
  position: relative;
  text-align: center;
  margin: 70px 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #61A120;
    left: calc(50% - 28px);
  }
`;

export const ContainerItems = styled.div`
  background: url('${(props) => props.$imageUrl}') no-repeat center;
  background-position: center;
  background-size: cover;
  border-radius: 20px;

  display: flex;
  align-items: flex-end;
  padding: 20px 10px;
  width: 100%;
  height: 200px;

  p {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 22.5px;
    font-weight: bold;
    width: auto;
    padding: 10px 30px;
    border-radius: 30px;
    margin-top: 50px;
  }
`;
