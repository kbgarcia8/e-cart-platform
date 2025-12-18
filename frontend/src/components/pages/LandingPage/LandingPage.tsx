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

const mainSectionImages = [
    {id: 1, url: 'https://www.simplyrecipes.com/thmb/2g1IOS6TYdG_bmyg0hyf0b6RKGY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Oatmeal-Raisin-Cookies-LEAD-15-2251dafb1a554aafaedf42e797bf2fd0.jpg'},
    {id: 2, url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/2020-03-24_20_57_22_An_open_jar_of_Skippy_Creamy_Peanut_Butter_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg'},
    {id: 3, url: 'https://www.allrecipes.com/thmb/sfelcjEEJH7OVjfRNjXhySOHncw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8378855-korean-style-cream-cheese-garlic-bread-DDMFS-Beauty-4x3-d2af8abd2a8d4e8bbd407fbf5fcd7a61.jpg'},
    {id: 4, url: 'https://www.pinoycookingrecipes.com/uploads/7/6/7/8/7678114/watermark-2019-04-24-14-44-59_orig.jpg'},
    {id: 5, url: 'https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg'},
    {id: 6, url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjA6CiRXXqj-anfuNscQaBK2-d-fHqgSFYe5tfQmrQ8-IpnqCMObuT9_DKyPrEeMmpwLjb9S33EazO1oBRehyphenhyphenU3DEktfbr7ze2TkMweKmp6Obiq5YVg4wwqQPzcANsZ8rgBleRpdp67gLlc/s1600/06102014+003.jpg'}
]

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const handlePreviousClick = React.useCallback(() => {
        setCurrentImageIndex(
            currentImageIndex === 0 ? mainSectionImages.length - 1 : currentImageIndex - 1
        );
    }, [currentImageIndex]);

    const handleNextClick = React.useCallback(() => {
        setCurrentImageIndex((currentImageIndex + 1) % mainSectionImages.length);
    }, [currentImageIndex]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            handleNextClick();
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentImageIndex, handleNextClick]);
    
    return(
        <Styled.LandingPageWrapper>
            <Styled.MainSection id={"landing"} title={"Baked goods, treats and snacks at your doorstep"}>
                <Styled.MainSectionSpace>
                    <Styled.ExploreMenuButton buttonType={"button"} text={"Explore Menu"} onClick={() => {console.log('View Public Menu')}}/>
                    <Styled.MainSectionimageCarousel handlePreviousClick={handlePreviousClick} currentImageIndex={currentImageIndex} images={mainSectionImages} handleNextClick={handleNextClick}/>
                </Styled.MainSectionSpace>
            </Styled.MainSection>
        </Styled.LandingPageWrapper>
    )
}

export default LandingPage;