import Link from "next/link";
import styled from "styled-components";

const SubTitle = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
`;

const PageTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
`;

const DescriptionText = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const PlainText = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 15px;
`;

const HeaderText = styled.h3`
  font-weight: 700;
  font-size: 20px; // same as in keystone
  color: #111827; // same as in keystone
`;

const LinkInForm = styled(Link)`
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export {
  SubTitle,
  PageTitle,
  DescriptionText,
  PlainText,
  HeaderText,
  LinkInForm,
};
