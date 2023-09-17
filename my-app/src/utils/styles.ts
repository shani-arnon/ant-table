import styled from 'styled-components';
import { Layout, Menu, Table, Tag, Radio, Badge, Button } from 'antd'

const { Header, Sider, Content } = Layout

export const SPage = styled.div`
    padding: 2rem 6rem;
`;
export const SHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: unset;
`;
export const STitle = styled.h2`
    color: #242424;
`;
export const SSider = styled(Sider)`
`;
export const SMenu = styled(Menu)`
    height: 100%;
`;
export const SContent = styled(Content)`
`;
export const STable = styled(Table)`
`;
export const SInput = styled.input`
    padding: 0 0.5rem;
    border-radius: 4px;
`;
export const SClearInput = styled.button`
`;
export const SButton = styled(Button)`
`;
export const STag = styled(Tag)`
    margin: 0.3rem;
`;
export const SRadio= styled(Radio)`
`;
export const SBadge = styled(Badge)`
`;
export const SearchBox = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    padding: 2rem;
`;