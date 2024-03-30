import React,{useState} from "react";
import friendly_color from "../Images/Images2/Images/friendly_color.png";
import venue_color from "../Images/Images2/Images/venue_color.png";
import scenario_color from "../Images/Images2/Images/scenario_color.png";
import time_color from "../Images/Images2/Images/time_color.png";
import phone_color from "../Images/Images2/Images/phone_color.png";
import idea_color from "../Images/Images2/Images/idea_color.png";
import friendly_normal from "../Images/Images2/Images/friendly_normal.png";
import venue_normal from "../Images/Images2/Images/venue_normal.png";
import scenario_normal from "../Images/Images2/Images/scenario_normal.png";
import time_normal from "../Images/Images2/Images/time_normal.png";
import phone_normal from "../Images/Images2/Images/phone_normal.png";
import idea_normal from "../Images/Images2/Images/idea_normal.png";
import { Link } from "react-router-dom";
import '../css/about.css'

function About() {

  const[abtInfo, setAbtInfo] = useState({
    abtTitle:"No.1 Events Catalogue",
    abtDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis consequuntur nisi dignissimos nobis omnis cum quam. Laudantium, saepe. Eius corporis sapiente quidem accusamus id fugit et modi exercitationem suscipit placeat."
  })


  const handleAc2h = (e)=>{
    if(e==="ft")
    {
      setAbtInfo({
        abtTitle: "Friendly Team",
        abtDesc : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi animi debitis saepe adipisci assumenda rerum, labore deserunt. Veniam, sit fugiat! Repudiandae officia earum, perspiciatis nobis repellendus error ducimus, dolores et deleniti at quo non quis vitae voluptates tempora ipsum nam dicta? Ad, repudiandae nihil tenetur sapiente quibusdam quaerat, veritatis dolorem porro dolor voluptatum quia sint inventore tempore natus perferendis error! Sed aperiam nemo qui autem provident et perferendis voluptatum distinctio cupiditate nobis eius sint laboriosam, architecto ab sapiente error, assumenda earum dicta quibusdam porro nesciunt iusto? Eligendi ad corporis, harum quidem incidunt quaerat accusamus distinctio cum maxime enim nesciunt molestias?"
      })
    }else if(e==="pv")
    {
      setAbtInfo({
        abtTitle: "Perfect Venues",
        abtDesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo distinctio laboriosam fuga dignissimos officia architecto cumque, blanditiis commodi consequatur alias. Eum ex autem distinctio reprehenderit incidunt veritatis quasi placeat impedit corrupti vel fugiat soluta numquam, laudantium, optio blanditiis? Quidem laborum incidunt mollitia maiores quas, rem tempore, esse eum repellat porro autem id deleniti. Explicabo totam ducimus pariatur autem magnam repellat maxime a consectetur. Culpa quibusdam veritatis adipisci expedita consequuntur eos ducimus dicta molestias, in nisi? Incidunt voluptate consectetur quod consequuntur repellendus recusandae porro perspiciatis doloribus debitis rerum temporibus quae, facilis enim et impedit qui molestiae quo repellat. Assumenda, officiis molestias!"
      })
    }else if(e==="us")
    {
      setAbtInfo({
        abtTitle: "Unique Scenarios",
        abtDesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et veniam sit quasi incidunt, ipsum harum quae a nam! Fugiat temporibus placeat non mollitia debitis voluptas nisi laborum illum voluptatem! Voluptatibus adipisci magnam omnis saepe, itaque laboriosam eligendi vel nostrum? Labore minima molestias perspiciatis nulla repellat doloribus cupiditate cumque. Non est dolorum minus quibusdam architecto dolor deleniti atque dicta molestias eius quod tenetur ratione nesciunt, iure inventore aliquam iusto quasi ipsam voluptas. Iure, nisi non blanditiis odio, vitae inventore error distinctio fugit ratione hic neque doloribus voluptatibus cumque earum officiis fuga! Necessitatibus veritatis placeat fugit in soluta, iusto aliquid sunt."
      })
    }else if(e==="ut")
    {
      setAbtInfo({
        abtTitle: "Unforgettable Time",
        abtDesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo distinctio laboriosam fuga dignissimos officia architecto cumque, blanditiis commodi consequatur alias. Eum ex autem distinctio reprehenderit incidunt veritatis quasi placeat impedit corrupti vel fugiat soluta numquam, laudantium, optio blanditiis? Quidem laborum incidunt mollitia maiores quas, rem tempore, esse eum repellat porro autem id deleniti. Explicabo totam ducimus pariatur autem magnam repellat maxime a consectetur. Culpa quibusdam veritatis adipisci expedita consequuntur eos ducimus dicta molestias, in nisi? Incidunt voluptate consectetur quod consequuntur repellendus recusandae porro perspiciatis doloribus debitis rerum temporibus quae, facilis enim et impedit qui molestiae quo repellat. Assumenda, officiis molestias!"
      })
    }else if(e==="hs")
    {
      setAbtInfo({
        abtTitle: "24/7 Hours Support",
        abtDesc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab nobis quibusdam neque! Ipsa aliquid repudiandae eum veniam sit, deleniti in unde? Ab natus quod quis aut dolore temporibus vitae quos ex quam nostrum! Officiis cum dolore velit dignissimos optio modi qui, non, distinctio laudantium doloremque repudiandae alias eum. Ipsum vitae hic deleniti autem fugit, dolorum expedita itaque obcaecati nulla non doloremque est nesciunt nisi veritatis tempore aut quae assumenda numquam sequi consequatur. Aut atque debitis doloribus, dolorem facere perspiciatis! In, quos? Numquam placeat blanditiis in ab, fugit animi consequuntur dolorum eaque veniam atque possimus. Non laboriosam maxime fugit laudantium rerum."
      })
    }else if(e==="bi")
    {
      setAbtInfo({
        abtTitle: "Brilliant Idea",
        abtDesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi explicabo beatae nemo unde sequi enim ad ut animi, voluptate molestiae est dolores deleniti quis voluptas quidem consectetur! Esse a culpa blanditiis praesentium ut at impedit sapiente explicabo quidem. Repellat modi rerum sint doloremque perspiciatis tenetur quod ratione nostrum sed? Rem, obcaecati, neque maiores quidem delectus voluptatem quos tempore aut iusto, omnis atque laboriosam totam asperiores sit sed aspernatur qui distinctio nostrum illum odio ut! Ex quo aliquid, eius ullam ut quas animi vitae iure. In qui repudiandae enim, magnam reprehenderit minima aliquid nobis necessitatibus! Inventore voluptatem delectus sint doloribus nisi."
      })
    }
  }


  return (
    <>
      <div className="about">
        <div className="aboutcontent">
          <div className="aboutcon1">
            <div className="topOr"></div>
            <div className="con1txt1">
              <p>WE ARE MOSAIC</p>
            </div>
            <div className="con1txt2">
              {/* <h1>No.1</h1> <p>Event Catalogue</p> */}
              <h3>{abtInfo.abtTitle}</h3>
              
            </div>
            <div className="con1txt3">
              <p>
                {abtInfo.abtDesc}
              </p>
            </div>
            <Link to={'/aboutMosaic'}><button className="vag vag1"> ABOUT MOSAIC </button></Link>
          </div>
          <div className="aboutcon2">
            <div className="ac2h" onClick={() => handleAc2h("ft")}>
              <div className="aboutimg">
                <img src={friendly_color} alt="" />
                <img src={friendly_normal} alt="" />
              </div>  
              <div className="imgDesc">
                <h4>Friendly Team</h4>
                <p>More than 200 teams</p>
              </div>
            </div>
            <div className="ac2h" onClick={() => handleAc2h("pv")}>
              <div className="aboutimg">
                <img src={venue_color} alt="" />
                <img src={venue_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Perfect Venues</h4>
                <p>Perfect Venues</p>
              </div>
            </div>
            <div className="ac2h" onClick={() => handleAc2h("us")}>
              <div className="aboutimg">
                <img src={scenario_color} alt="" />
                <img src={scenario_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Unique Scenarios</h4>
                <p>We thinking out of the box</p>
              </div>
            </div>
            <div className="ac2h" onClick={() => handleAc2h("ut")}>
              <div className="aboutimg">
                <img src={time_color} alt="" />
                <img src={time_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Unforgettable Time</h4>
                <p>We make you perfect event</p>
              </div>
            </div>
            <div className="ac2h" onClick={() => handleAc2h("hs")}>
              <div className="aboutimg">
                <img  className="supportimg" src={phone_color} alt="" />
                <img className="supportimg" src={phone_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>24/7 Hours Support</h4>
                <p>Anytime anywhere</p>
              </div>
            </div>
            <div className="ac2h" onClick={() => handleAc2h("bi")}>
              <div className="aboutimg">
                <img src={idea_color} alt="" />
                <img src={idea_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Brilliant Idea</h4>
                <p>We have million idea</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
