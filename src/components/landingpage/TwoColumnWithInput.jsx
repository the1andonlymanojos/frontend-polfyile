import React from "react";
import styled from "styled-components";
import Header from "./headercompo/light";

// Import SVGs as images
import SvgDecoratorBlob1 from "../img/svg-decorator-blob-1.svg"; // Importing as an image
import DesignIllustration from "../img/design-illustration-2.svg";
import CustomersLogoStripImage from "../img/customers-logo-strip.png";

// Styled Components
const Container = styled.div`
  position: relative;
`;

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px; /* max-w-screen-xl */
  margin: 0 auto;
  padding: 5rem 0; /* py-20 md:py-24 */
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  position: relative;
  width: 100%; /* full width on mobile */
  text-align: center; /* center on mobile */
  max-width: 28rem; /* max-w-lg */
  margin: 0 auto; /* Center on mobile */
  
  @media (min-width: 1024px) {
    max-width: none; /* lg:max-w-none */
    text-align: left; /* lg:text-left */
  }
`;

const RightColumn = styled.div`
  position: relative;
  margin-top: 3rem; /* mt-12 */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    margin-top: 0; /* lg:mt-0 */
    align-self: flex-end; /* lg:self-end */
  }
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 2rem; /* text-3xl */
  line-height: tight; /* leading-tight */

  @media (min-width: 768px) {
    font-size: 2rem; /* md:text-3xl */
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem; /* lg:text-4xl */
  }

  @media (min-width: 1280px) {
    font-size: 2.5rem; /* xl:text-5xl */
  }

  color: #4A5568; /* text-gray-900 */
`;

const Paragraph = styled.p`
  margin: 1.25rem 0; /* my-5 */
  font-size: 1rem; /* text-base */
  
  @media (min-width: 1280px) {
    font-size: 1.125rem; /* xl:text-lg */
  }
`;

const Actions = styled.div`
  position: relative;
  max-width: 28rem; /* max-w-md */
  text-align: center; /* Center on mobile */
  margin: 0 auto; /* Center on mobile */

  input {
    padding-left: 2rem; /* pl-8 */
    padding-right: 12rem; /* sm:pr-48 */
    padding-top: 1rem; /* py-4 */
    padding-bottom: 1rem; /* sm:py-5 */
    border-radius: 9999px; /* rounded-full */
    border: 2px solid; /* border-2 */
    width: 100%; /* w-full */
    font-weight: 500; /* font-medium */
    outline: none; /* focus:outline-none */
    transition: border-color 0.3s; /* transition duration-300 */

    &:focus {
      border-color: #3B82F6; /* focus:border-primary-500 */
    }

    &:hover {
      border-color: #A0AEC0; /* hover:border-gray-500 */
    }
  }

  button {
    width: 100%; /* w-full */
    position: absolute; /* sm:absolute */
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #3B82F6; /* bg-primary-500 */
    color: #F7FAFC; /* text-gray-100 */
    font-weight: bold; /* font-bold */
    margin-right: 0.5rem; /* mr-2 */
    margin-top: 1rem; /* my-4 */
    margin-bottom: 0.5rem; /* sm:my-2 */
    border-radius: 9999px; /* rounded-full */
    padding: 1rem; /* py-4 */
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 640px) {
      width: auto; /* sm:w-40 */
      line-height: normal; /* sm:leading-none */
    }

    outline: none; /* focus:outline-none */
    
    &:hover {
      background-color: #1E3A8A; /* hover:bg-primary-900 */
      transition: background-color 0.3s; /* transition duration-300 */
    }
  }
`;

const IllustrationContainer = styled.div`
  display: flex;
  justify-content: center; /* justify-center */
  align-items: center; /* items-center */

  @media (min-width: 1024px) {
    justify-content: flex-end; /* lg:justify-end */
  }
`;

// Use an image tag to render the blob
const DecoratorBlob1 = styled.img`
  pointer-events: none; /* pointer-events-none */
  opacity: 0.05; /* opacity-5 */
  position: absolute; /* absolute */
  left: 0; /* left-0 */
  bottom: 0; /* bottom-0 */
  height: 16rem; /* h-64 */
  width: 16rem; /* w-64 */
  transform: translateX(-66.67%); /* -translate-x-2/3 */
  z-index: -10; /* -z-10 */
`;

const CustomersLogoStrip = styled.div`
  margin-top: 3rem; /* mt-12 */

  p {
    text-transform: uppercase; /* uppercase */
    font-size: 0.875rem; /* text-sm */
    letter-spacing: 0.05em; /* tracking-wider */
    font-weight: bold; /* font-bold */
    color: #A0AEC0; /* text-gray-500 */
  }

  img {
    margin-top: 1rem; /* mt-4 */
    width: 100%; /* w-full */
    opacity: 0.5; /* opacity-50 */
    
    @media (min-width: 1024px) {
      padding-right: 4rem; /* lg:pr-16 */
    }

    @media (min-width: 1280px) {
      padding-right: 8rem; /* xl:pr-32 */
    }
  }
`;

const MainComponent = ({ roundedHeaderButton }) => {
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Beautiful React Templates <span style={{ color: '#3B82F6' }}>for you.</span>
            </Heading>
            <Paragraph>
              Our templates are easy to setup, understand and customize. Fully modular components with a variety of
              pages and components.
            </Paragraph>
            <Actions>
              <input type="text" placeholder="Your E-mail Address" />
              <button>Get Started</button>
            </Actions>
            <CustomersLogoStrip>
              <p>Our TRUSTED Customers</p>
              <img src={CustomersLogoStripImage} alt="Our Customers" />
            </CustomersLogoStrip>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                style={{ minWidth: 0, width: '100%', maxWidth: '40rem', maxHeight: '80%' }} 
                src={DesignIllustration} 
                alt="Design Illustration" 
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 src={SvgDecoratorBlob1} alt="Decorator Blob" />
      </Container>
    </>
  );
};

export default MainComponent;
