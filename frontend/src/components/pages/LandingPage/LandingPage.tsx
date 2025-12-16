import React from "react";
import * as Styled from "./LandingPage.styles"
import FacebookIcon from "components/svgs/FacebookIcon.tsx";
import InstagramIcon from "components/svgs/InstagramIcon.tsx";
import XIcon from "components/svgs/XIcon.tsx";
import TiktokIcon from "components/svgs/TiktokIcon.tsx";


const services = [
    {
        name: "Online Transaction",
        icon: "https://cdn-icons-png.freepik.com/512/11027/11027115.png?ga=GA1.1.404857351.1712593838",
        description: "Enjoy seamless ordering with our user-friendly online platform—browse the menu, place your order, and pay digitally for a hassle-free café experience."
    },
    {
        name: "Reward Points",
        icon: "https://cdn-icons-png.freepik.com/512/1900/1900385.png?ga=GA1.1.404857351.1712593838",
        description: "Every order earns you points! Redeem them for exciting discounts, freebies, or exclusive treats. Loyalty definitely tastes better at Kain at Kape."
    },
    {
        name: "Event & Space Rental",
        icon: "https://cdn-icons-png.freepik.com/512/16490/16490234.png?ga=GA1.1.404857351.1712593838",
        description: "Planning a small celebration, meeting, or cozy gathering? Our warm and welcoming space is available for private rentals—perfect for making moments memorable."
    },
    {
        name: "Pet Friendly",
        icon: "https://cdn-icons-png.freepik.com/512/489/489399.png?ga=GA1.1.404857351.1712593838",
        description: "Fur babies are family too! Bring them along and relax in our designated pet-friendly area, complete with comfort and care for you and your companion."
    }
]

const LandingPage = () => {

    return(
        <Styled.LandingPageWrapper>
            <Styled.MainSection id={"landing"} title={"Baked Goods and Treats at your doorstep"}>

            </Styled.MainSection>
        </Styled.LandingPageWrapper>
    )
}

export default LandingPage;