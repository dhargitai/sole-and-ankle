import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
    slug,
    name,
    imageSrc,
    price,
    salePrice,
    releaseDate,
    numOfColors,
}) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc} />
                </ImageWrapper>
                <Spacer size={12} />
                <Row>
                    <Name>{name}</Name>
                    <Price>{formatPrice(price)}</Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
                </Row>

                {variant === "new-release" ? (
                    <NewRelease>Just Released!</NewRelease>
                ) : variant === "on-sale" ? (
                    <OnSale>Sale</OnSale>
                ) : null}
            </Wrapper>
        </Link>
    );
};

const Tag = styled.span`
    position: absolute;
    top: 12px;
    right: -4px;
    color: ${COLORS.white};
    padding: 7px 10px;
    border-radius: 2px;
    font-weight: ${WEIGHTS.medium};
    font-size: ${14 / 16}rem;
`;

const NewRelease = styled(Tag)`
    background-color: ${COLORS.secondary};
`;

const OnSale = styled(Tag)`
    background-color: ${COLORS.primary};
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`;

const Wrapper = styled.article`
    position: relative;
`;

const ImageWrapper = styled.div`
    border-radius: 16px 16px 4px 4px;
    overflow: clip;
`;

const Image = styled.img`
    width: 100%;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
`;

const Name = styled.h3`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    margin-left: auto;
`;

const ColorInfo = styled.p`
    color: ${COLORS.gray[700]};
`;

export default ShoeCard;
