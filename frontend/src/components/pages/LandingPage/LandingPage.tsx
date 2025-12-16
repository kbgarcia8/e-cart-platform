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
            <Styled.AboutUsSpace>
                <Styled.AboutUsHeader>{"About Us"}</Styled.AboutUsHeader>
                <Styled.AboutUsArticle>{"Kain at Kape began as a simple dream between friends who shared a deep love for two of life’s greatest comforts—delicious food (\"kain\") and freshly brewed coffee (\"kape\"). Tucked in a cozy corner of the city, our café was born from countless late-night conversations, heartfelt recipes passed down through generations, and a desire to create a space where people could slow down and savor the moment. Every cup we serve and every dish we prepare is inspired by Filipino warmth, community, and a love for authentic flavors. Whether you're here for your morning pick-me-up or an afternoon bite with friends, we invite you to feel right at home. Welcome to Kain at Kape—where food and coffee bring people together."}</Styled.AboutUsArticle>
            </Styled.AboutUsSpace>
            <Styled.UniquenessDescriptionSpace>
                <Styled.DescriptionSpace>
                    <Styled.DescriptionHeader>{"What's different in our Kape"}</Styled.DescriptionHeader>
                    <Styled.Description>{"At Kain at Kape, coffee isn’t just a drink—it’s an experience. What sets our brews apart is our commitment to quality and Filipino identity. We proudly source our beans from local farmers across the Philippines, from the rich soils of Benguet to the bold notes of Mt. Apo. Each cup celebrates our roots with flavors that are earthy, deep, and distinctly Pinoy. Our beans are freshly roasted in small batches to preserve their natural aroma and character. Paired with our unique brewing methods and thoughtful craftsmanship, every sip tells a story—of culture, community, and care. It’s coffee made with purpose, passion, and a whole lot of heart."}</Styled.Description>
                </Styled.DescriptionSpace>
                <Styled.DescriptionSpaceFiller></Styled.DescriptionSpaceFiller>
                <Styled.DescriptionSpace>
                    <Styled.DescriptionHeader>{"A Taste for Every Craving"}</Styled.DescriptionHeader>
                    <Styled.Description2>{"At Kain at Kape, variety is at the heart of what we do. Our menu is thoughtfully crafted to satisfy every kind of appetite—from light bites to full meals, sweet cravings to savory indulgences. Whether you’re in the mood for a comforting bowl of pasta, a warm, flaky pastry, hearty rice meals, or a refreshing dessert, we’ve got something that hits the spot."}</Styled.Description2>
                    <Styled.Description2>{"We take pride in offering a wide selection so that every visit brings a new flavor to discover. It's the kind of place where you can start your day with a filling brunch, catch up with friends over snacks, or wind down with a satisfying dinner—no matter what time, there's always something for everyone.At Kain at Kape, we don’t just serve food—we serve moments, memories, and meals that bring people together."}</Styled.Description2>
                </Styled.DescriptionSpace>
            </Styled.UniquenessDescriptionSpace>
            <Styled.ServicesSpace>
                {services.map((service, index) => (
                    <Styled.ServicesCard key={index}>
                        <Styled.ServiceHeader>{`${service.name}`}</Styled.ServiceHeader>
                        <Styled.ServicesDescrptionSpace>
                            <Styled.ServiceIcon src={service.icon} alt={`${service.name}-icon`}/>
                            <Styled.ServicesDescrption>{`${service.description}`}</Styled.ServicesDescrption>
                        </Styled.ServicesDescrptionSpace>
                    </Styled.ServicesCard>
                ))}
            </Styled.ServicesSpace>
            <Styled.SocialDetailsSpace>                
                <Styled.SocialDetailsSpanContainer>
                    <Styled.SocialDetailsHeader>{"Follow us on our social medias!"}</Styled.SocialDetailsHeader>
                    <Styled.SocialDetailsSpan>
                        <FacebookIcon strokeWidth={3}/>
                        {"Kain at Kape - Cafe"}
                    </Styled.SocialDetailsSpan>
                    <Styled.SocialDetailsSpan>
                        <InstagramIcon strokeWidth={3}/>
                        {"@kainatkapena"}
                    </Styled.SocialDetailsSpan>
                    <Styled.SocialDetailsSpan>
                        <XIcon strokeWidth={3}/>
                        {"@kainatkapeph"}
                    </Styled.SocialDetailsSpan>
                    <Styled.SocialDetailsSpan>
                        <TiktokIcon strokeWidth={3}/>
                        {"@araw-arawkainatkape"}
                    </Styled.SocialDetailsSpan>
                </Styled.SocialDetailsSpanContainer>
                <Styled.SocialDetailsImageContainer>
                    
                </Styled.SocialDetailsImageContainer>
            </Styled.SocialDetailsSpace>
        </Styled.LandingPageWrapper>
    )
}

export default LandingPage;