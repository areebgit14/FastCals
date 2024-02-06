import React from 'react';
function About() {
  const aboutContent = `
  Welcome to FastCals – the app that empowers you to achieve your health goals through the joy of fast food!

  In a world where fast food is often associated with unhealthy choices, FastCals is here to revolutionize your perspective. We believe that fast food can be a positive force in your life. With our app, you'll make informed decisions about your dietary choices while relishing the convenience of fast food.

  HOW IT WORKS:
  - Let us know what your current daily calorie/protein intake and goals are
  - Discover a curated selection of fast food options tailored to your nutritional needs and that are open near by.
  - Choose a delicious option and get all the macro information needed to suit your needs.

  FastCals is more than just restriction; it's about finding a balance that suits your lifestyle. We provide information, choices, and flexibility so you can savor your favorite fast food guilt-free.
  
  Whether you're always busy on the move and need a quick bite or just looking for a tasty treat all while meeting your macro goals, FastCals got your back!
 
  Join us on this journey to redefine how we perceive and enjoy fast food. Let's transform it into a positive and empowering experience!

  Here's to fast food that not only satisfies your cravings but also fuels your goals!
`;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">About FastCals</h1>
        </div>
      </div>
      <div className="about-content">
      <pre dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </div>
    </div>
  );
}

export default About;
