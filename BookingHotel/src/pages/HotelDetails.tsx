import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Map from "../components/Map";

import { assets } from "../assets/assets";
import { getHotelById } from "../api/hotelApi";


interface Hotel {

  id:number;

  name:string;

  address:string;

  location:string;

  reviews:string;

  price:number;

  rate:string;

  image:string;

  images:string[];

  amenities:string[];

  description:string;

  host:{
    name:string;
    reviews:string;
    responseRate:string;
    responseTime:string;
  };

}



const HotelDetails = () => {


  const { id } = useParams();


  const navigate = useNavigate();



  const [hotel,setHotel] = useState<Hotel | null>(null);


  const [loading,setLoading] = useState(true);



  const [mainImage,setMainImage] = useState("");



  const [checkIn,setCheckIn] = useState("");

  const [checkOut,setCheckOut] = useState("");

  const [guests,setGuests] = useState(2);




  useEffect(()=>{


    const fetchHotel = async()=>{


      try{


        const data = await getHotelById(Number(id));


        if(data){

          setHotel(data);

          setMainImage(data.images[0]);

        }


      }
      catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }


    };


    fetchHotel();



  },[id]);






  if(loading){

    return(

      <div className="
      flex
      h-screen
      items-center
      justify-center
      text-xl
      font-bold
      ">

        Loading Hotel...

      </div>

    );

  }






  if(!hotel){


    return(

      <div className="
      flex
      h-screen
      items-center
      justify-center
      text-xl
      font-bold
      ">

        Hotel Not Found

      </div>

    );

  }






  const getAmenityIcon=(name:string)=>{


    switch(name.toLowerCase()){


      case "free wifi":

        return assets.freeWifiIcon;



      case "free breakfast":

        return assets.freeBreakfastIcon;



      case "room service":

        return assets.roomServiceIcon;



      default:

        return assets.homeIcon;


    }


  };






  const calculateNights = ()=>{


    if(!checkIn || !checkOut){

      return 0;

    }



    const start = new Date(checkIn);


    const end = new Date(checkOut);



    const difference =
    end.getTime() - start.getTime();



    return Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );


  };




  const nights = calculateNights();



  const totalPrice =
  nights * hotel.price * guests;







  return (


<div>


<Navbar />



<div className="
min-h-screen
bg-gray-100
px-10
pt-32
lg:px-20
">






<div className="
bg-white
rounded-2xl
p-8
mb-8
">


<div className="
flex
flex-col
lg:flex-row
justify-between
gap-5
">


<div>


<h1 className="
text-3xl
font-bold
text-gray-800
">

{hotel.name}

</h1>



<p className="mt-3 text-gray-500">

📍 {hotel.location}

</p>



<p className="mt-3 text-gray-500">

⭐ {hotel.rate} • {hotel.reviews}

</p>


</div>





<div>


<span className="
rounded-full
bg-red-500
px-4
py-1
text-white
">

20% OFF

</span>




<h2 className="
mt-4
text-3xl
font-bold
">

${hotel.price}

<span className="
text-sm
font-normal
text-gray-500
">

 / night

</span>


</h2>


</div>



</div>



</div>









<div className="
grid
grid-cols-1
gap-5
lg:grid-cols-[2fr_1fr]
">



<img

src={mainImage}

alt={hotel.name}

className="
h-[520px]
w-full
rounded-3xl
object-cover
"

/>





<div className="
grid
grid-cols-2
gap-5
">


{
hotel.images.map((image,index)=>(


<img

key={index}

src={image}

alt={hotel.name}

onClick={()=>setMainImage(image)}

className={`
h-[250px]
w-full
rounded-2xl
object-cover
cursor-pointer
transition
hover:scale-105

${mainImage===image ? "ring-4 ring-gray-800":""}

`}


/>


))

}


</div>


</div>










<div className="
mt-8
rounded-2xl
bg-white
p-8
">


<h2 className="
mb-5
text-2xl
font-bold
">

Amenities

</h2>




<div className="
flex
flex-wrap
gap-8
">


{
hotel.amenities.map((item,index)=>(


<div
key={index}
className="
flex
items-center
gap-2
"
>


<img

src={getAmenityIcon(item)}

className="w-6"

alt={item}

/>


{item}


</div>


))
}



</div>


</div>









{/* BOOKING SECTION */}


<div className="
mt-8
rounded-2xl
bg-white
p-8
">


<h2 className="
text-2xl
font-bold
mb-6
">

Check Availability

</h2>





<div className="
grid
grid-cols-1
md:grid-cols-4
gap-5
">


<input

type="date"

value={checkIn}

onChange={(e)=>setCheckIn(e.target.value)}

className="
border
rounded-lg
p-3
"

/>





<input

type="date"

value={checkOut}

onChange={(e)=>setCheckOut(e.target.value)}

className="
border
rounded-lg
p-3
"

/>







<select

value={guests}

onChange={(e)=>setGuests(Number(e.target.value))}

className="
border
rounded-lg
p-3
"

>


<option value={1}>
1 Guest
</option>


<option value={2}>
2 Guests
</option>


<option value={3}>
3 Guests
</option>


<option value={4}>
4 Guests
</option>


<option value={5}>
5 Guests
</option>


</select>







<button

onClick={()=>{


if(nights>0){


navigate(`/booking/${hotel.id}`,{


state:{

hotel,

checkIn,

checkOut,

guests,

nights,

totalPrice

}


});


}



}}


className="
rounded-lg
bg-gray-800
text-white
hover:bg-gray-700
"


>

Continue Booking


</button>



</div>





{
nights>0 &&


<div className="
mt-6
bg-gray-100
rounded-xl
p-5
">


<p>

{nights} nights × ${hotel.price}

</p>



<h3 className="
text-2xl
font-bold
mt-2
">

Total: ${totalPrice}

</h3>



</div>


}




</div>









<div className="
mt-8
rounded-2xl
bg-white
p-8
">


<h2 className="
text-2xl
font-bold
">

About this place

</h2>


<p className="
mt-4
leading-8
text-gray-600
">

{hotel.description}

</p>


</div>








<div className="
mt-8
rounded-2xl
bg-white
p-8
">


<h2 className="
text-2xl
font-bold
">

Location on map

</h2>



<div className="
mt-6
overflow-hidden
rounded-2xl
">

<Map />

</div>


</div>








<div className="
mt-8
mb-20
rounded-2xl
bg-white
p-8
">


<h2 className="
text-2xl
font-bold
">

It's like a home away from home.

</h2>



<h3 className="
mt-5
text-xl
font-semibold
">

Hosted by {hotel.host.name}

</h3>



<p className="text-gray-600">

{hotel.host.reviews}

</p>



<p className="text-gray-600">

Response rate: {hotel.host.responseRate}

</p>



<p className="text-gray-600">

Response time: {hotel.host.responseTime}

</p>



<button className="
mt-6
rounded-full
bg-gray-800
px-8
py-3
text-white
">

Contact Now

</button>



</div>






</div>



<Footer />


</div>


  );

};


export default HotelDetails;