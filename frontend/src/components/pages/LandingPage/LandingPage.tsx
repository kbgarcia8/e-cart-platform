import React from "react";
import * as Styled from "./LandingPage.styles";
import Button from "components/atoms/Button";
import Section from "components/molecules/Section";
import ImageCarousel from "components/molecules/ImageCarousel";
import ProductPreviewCard from "components/molecules/ProductPreviewCard";
import TestimonialCard from "components/molecules/TestimonialCard";
import Accordion from "components/molecules/Accordion";
import { v } from "constants/variables";
import useTheme from "hooks/useTheme";

const mainSectionImages = [
    {id: 1, url: 'https://www.simplyrecipes.com/thmb/2g1IOS6TYdG_bmyg0hyf0b6RKGY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Oatmeal-Raisin-Cookies-LEAD-15-2251dafb1a554aafaedf42e797bf2fd0.jpg'},
    {id: 2, url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/2020-03-24_20_57_22_An_open_jar_of_Skippy_Creamy_Peanut_Butter_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg'},
    {id: 3, url: 'https://www.allrecipes.com/thmb/sfelcjEEJH7OVjfRNjXhySOHncw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8378855-korean-style-cream-cheese-garlic-bread-DDMFS-Beauty-4x3-d2af8abd2a8d4e8bbd407fbf5fcd7a61.jpg'},
    {id: 4, url: 'https://www.pinoycookingrecipes.com/uploads/7/6/7/8/7678114/watermark-2019-04-24-14-44-59_orig.jpg'},
    {id: 5, url: 'https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg'},
    {id: 6, url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjA6CiRXXqj-anfuNscQaBK2-d-fHqgSFYe5tfQmrQ8-IpnqCMObuT9_DKyPrEeMmpwLjb9S33EazO1oBRehyphenhyphenU3DEktfbr7ze2TkMweKmp6Obiq5YVg4wwqQPzcANsZ8rgBleRpdp67gLlc/s1600/06102014+003.jpg'}
]

const features = [
    {
        name: "Freshly Baked Goods and Homemade Spreads",
        url: "https://www.yoonpak.com/wp-content/uploads/2024/06/baking-3.jpg"
    },
    {
        name: "Door-to-door Delivery Service",
        url: "https://www.spoton.com/blog/content/images/2021/06/The-Rising-Value-of-Food-Delivery.jpg"
    },
    {
        name: "Earn points and redeem rewards",
        url: "https://blogimage.vantagecircle.com/content/images/2022/03/How-To-Set-Up-A-Successful--Points-Based-Rewards-System-At-Work-.png"
    },
    {
        name: "Accepts custom orders for events",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShshOgPBeUVFwyicHPVp2qlVTO0lThGk83bQ&s"
    },
    {
        name: "Discount and Happy Hour Promos",
        url: "https://cbx-prod.b-cdn.net/COLOURBOX54687374.jpg?width=800&height=800&quality=70"
    }
]

const productPreviews = [
    {
        image: "https://www.tasteofhome.com/wp-content/uploads/2025/04/Cassava-Cake_EXPS_TOHcom25_278348_MD_P2_03_27_7b.jpg",
        name: "Cassava Cake",
        basePrice: 200,
        category: "Cake",
        productId: 5
    },
    {
        image: "https://images.yummy.ph/yummy/uploads/2023/12/lechonbellyrecipe-1.jpg",
        name: "Pork Belly Roll",
        basePrice: 400,
        category: "Mains",
        productId: 3
    },
    {
        image: "https://flouredframe.com/wp-content/uploads/2019/12/vegan-leche-flan-ft-image-1200x1200-1-500x500.jpg",
        name: "Leche Flan",
        basePrice: 120,
        category: "Desserts",
        productId: 7
    },
    {
        image: "data:image/jpeg;base64,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",
        name: "Ube Halaya",
        basePrice: 120,
        category: "Desserts",
        productId: 8
    },
    {
        image: "https://www.recipesbynora.com/wp-content/uploads/2025/03/Bibingkang-Malagkit-featured-image-1.jpg",
        name: "Bibingkang Malagkit",
        basePrice: 250,
        category: "Desserts",
        productId: 11
    }
]

const temporaryTestimonies = [
    {
        user: "Elizabeth Doe",
        photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        rating: "4.5",
        message: "The product quality exceeded my expectations, and the entire checkout process was seamless. Delivery was fast, and customer support was responsive and helpful. This platform has become my go-to for online shopping."
    },
    {
        user: "Jessica Stewart",
        photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
        rating: "3.0",
        message: "From browsing to checkout, the entire experience was seamless. The platform is intuitive, the product descriptions are accurate, and delivery was faster than expected. What really stood out was the customer support—responsive, helpful, and genuinely focused on resolving my concerns."
    },
    {
        user: "Mark Hanes",
        photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        rating: "5.0",
        message: "I’ve used several e-commerce platforms, but this one sets a higher standard. The product quality exceeded my expectations, and the order tracking kept me informed every step of the way. It’s clear that both the technology and the service were built with the customer in mind."
    }
];

const FAQItems = [
    {
        header: "Do you have a physical store?",
        content: "Yes, we have a physical store for those who wish for pick-up transaction. We are located at xxxxxxxx"
    },
    {
        header: "Do I need an account to place an order?",
        content: "You can browse products without an account. However, creating an account allows you to place orders faster, track your purchases, save addresses, earn points and view your order history."
    },
    {
        header: "How do I add items to my cart?",
        content: "Simply select a product and click Add to Cart. You can review or update your cart at any time before proceeding to checkout."
    },
    {
        header: "What payment methods are supported?",
        content: "We support secure online payments, including debit cards transfer/QRPh. All transactions are encrypted and processed securely."
    },
    {
        header: "What is your return and refund policy?",
        content: "If you are not satisfied with your purchase, you may request a return within the allowed return period. Refunds are processed according to our return policy and payment provider timelines."
    },
]

const LandingPage = () => {
    const {currentTheme} = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [activePanel, setActivePanel] = React.useState<number | null>(null);

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
    
    const starRatingColors = React.useMemo(() => {
        return {
            filled: currentTheme.notificationPalette.warningBackground,
            blank: currentTheme.colors.shadow
        }
    }, [currentTheme]);

    const handleActivatePanel = React.useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
        const { index } = e.currentTarget?.dataset;
        const activeIndex = Number(index);

        setActivePanel((prevIndex) => prevIndex !== activeIndex ? activeIndex : null);

    }, [activePanel]);
    
    return(
        <Styled.LandingPageWrapper>
            <Styled.MainSectionWrapper>
                <Section id={"landing"} className={"main-section"} title={"Baked goods, treats and snacks at your doorstep"} titleColor={"secondary"} titleSize={"giga"} titleBottomMargin={`${v.spacing.xlarge}`}>
                    <Styled.ExploreMenuButtonWrapper>
                        <Button size={"large"} radius={"roundedsquare"} text={"Explore Menu"} onClick={() => {console.log('View Public Menu')}}/>
                    </Styled.ExploreMenuButtonWrapper>
                    <Styled.MainSectionImageCarouselWrapper>
                        <ImageCarousel hasManualNavigation={false} currentImageIndex={currentImageIndex} images={mainSectionImages} handleNextClick={handleNextClick} radius={"roundedsquare"}/>
                    </Styled.MainSectionImageCarouselWrapper>
                </Section>
            </Styled.MainSectionWrapper>
            <Styled.FeatureSectionWrapper>
                <Section id={"features"} title={"Why Order from us?"} titleColor={"teritiary"} titleBottomMargin={"0"}>
                    <Styled.FeaturesContainer>
                        {features.map((feature, index) => (
                            <Styled.FeatureCard key={index} id={`feature-${index}`} $imageUrl={feature.url}>
                                <Styled.FeatureHeader>{feature.name}</Styled.FeatureHeader>
                            </Styled.FeatureCard>
                        ))}
                    </Styled.FeaturesContainer>
                </Section>
            </Styled.FeatureSectionWrapper>
            <Styled.MenuPreviewSectionWrapper>
                <Section id={"products"} title={"Some of our Products"} titleColor={"secondary"} titleSize={"giga"}>
                    <Styled.ProductsPreviewContainer>
                        {productPreviews.map((product,index) => (
                            <ProductPreviewCard
                                key={`${product.name}-${index}`}
                                productImage={product.image}
                                productName={product.name}
                                basePrice={product.basePrice}
                                dataCategory={product.category}
                                dataProductId={product.productId}
                                cardRadius={"roundedsquare"}
                                cardColor={"primary"}
                                imageRadius={"roundedsquare"}
                                titleColor={"teritiary"}
                                priceColor={"teritiary"}
                                buttonRadius={"roundedsquare"}
                            />
                        ))}
                    </Styled.ProductsPreviewContainer>
                    <Styled.SeeMoreProductsButtonWrapper>
                        <Button size={"larger"} radius={"roundedsquare"}  text={"See More"} onClick={() => {console.log('View More Products')}}/>
                    </Styled.SeeMoreProductsButtonWrapper>
                </Section>
            </Styled.MenuPreviewSectionWrapper>
            <Styled.TestimonialSectionWrapper>
                <Section id={"testimonials"} title={"Client Testimonials"} titleColor={"secondary"} titleSize={"bigger"}>
                    <Styled.TestimonialsContainer>
                        {temporaryTestimonies.map((testimony, index) => (
                            <TestimonialCard
                                key={`${testimony.user}-${index}-testimony`}
                                testimonial={testimony}
                                ratedColor={starRatingColors.filled}
                                noRateColor={starRatingColors.blank}
                                cardRadius="roundedsquare"
                                nameColor="light"
                                messageColor="teritiary"
                            />
                        ))
                        }
                    </Styled.TestimonialsContainer>
                </Section>
            </Styled.TestimonialSectionWrapper>
            <Styled.FAQSectionWrapper>
                <Section id={"faqs"} title={"FAQs"} titleColor={"bnw"} titleSize={"giga"}>
                    <Styled.FAQsContainer>
                        <Accordion items={FAQItems} handleActivatePanel={handleActivatePanel} activePanel={activePanel} />
                    </Styled.FAQsContainer>
                </Section>
            </Styled.FAQSectionWrapper>
            <Styled.ContactSectionWrapper>
                <Section id={"faqs"} title={"Contact Us"} titleColor={"secondary"} titleSize={"giga"}></Section>
            </Styled.ContactSectionWrapper>
        </Styled.LandingPageWrapper>
    )
}

export default LandingPage;