import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleMOvie } from "../../api/movies";
import Container from "../utility/Container";
import { FaStar } from "react-icons/fa";
import { getSingleActor } from "../../api/actor";
import Review from "../review/Review";

const SingleMoviePage = () => {
  const { movieId } = useParams();

  const [singleMovieData, setSingleMovieData] = useState({});
  const [isOpen,setIsOpen]=useState(false)

  const movieData = async (movieId) => {
    const { data } = await getSingleMOvie(movieId);
    console.log(data?.data);
    setSingleMovieData(data?.data);
  };

  const [castD, setCastD] = useState([]);

  const castData = async () => {
    if (cast) {
      cast.map(async (c) => {
        const { data } = await getSingleActor(c._id);
        setCastD((prev) => {
          return [
            ...prev,
            {
              roleAs: c.roleAs,
              name: data?.data?.name,
              image: data?.data?.avatar?.url,
            },
          ];
        });
      });
    }
  };
  console.log(castD);
  useEffect(() => {
    movieData(movieId);
  }, []);

  const {
    poster,
    trailer,
    title,
    avgRating,
    tags,
    storyLine,
    director,
    writers,
    actors,
    language,
    cast,
  } = singleMovieData;
  console.log(singleMovieData);

  useEffect(() => {
    castData();
  }, [cast]);
  useEffect(() => {
    console.log(castD);
  }, [castD]);
  return (
    <div className="container text-white">
      <div className="row mt-5">
        <div
          style={{ fontSize: "2rem", marginLeft: "4px" }}
          className="col-12 col-md-8"
        >
          {title}
        </div>

        <div className="col-md-3 d-none d-md-flex justify-content-between">
          <div>
            <div> RATING</div>
            <div className="d-flex justify-content-between align-items-center">
              <FaStar
                style={{ color: "yellow", height: "1.2rem", width: "1.2rem" }}
              />
              {avgRating && <div> {avgRating[0]?.avgRating}/10</div>}
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div>Your Rating</div>
            <div className="d-flex justify-content-around align-items-center">
              <FaStar
                style={{ color: "aqua", height: "1.2rem", width: "1.2rem" }}
              />
              <div>RATE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 h-auto">
        <div className="col-4  ">
          <div className="h-full">
            <img className="rounded h-full" src={poster?.url} alt="" />
          </div>
        </div>
        <div className="col-8  ">
          <video
            className="h-90 rounded"
            controls
            autoPlay
            src={trailer?.url}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="overflow-auto">
          <div className="d-flex flex-nowrap">
            {tags &&
              tags.map((tag, index) => (
                <div
                  style={{ borderRadius: "13px", padding: "0 15px" }}
                  className="  border  mr-5"
                  key={index}
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>

      {storyLine && <div className="row p-3">{storyLine}</div>}

      <div className="row ">
        <div className="col-9">
          <div className="row border-top p-2 d-flex">
            <div>Director :</div>
            {director && <div>{director}</div>}
          </div>
          <div className="row border-top  p-2">
            <div>Writers :</div>
            {writers && (
              <div className="d-flex">
                {writers.map((w) => (
                  <div>{w}</div>
                ))}
              </div>
            )}
          </div>
          <div className="row border-top  p-2">
            <div>Language :</div>
            {language && (
              <div className="d-flex">
                {language.map((w) => (
                  <div>{w}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-3">
          Watch options
          <div className="flex mt-3">
            <Link to={`$1`}>img of platform +Plateform Name</Link>
          </div>
        </div>
        <div className="row border-top  p-2">
          Stars
          <div className="row">
            {castD &&
              castD.map((c, index) => (
                <div
                  key={index}
                  className="flex p-2 m-2  border rounded w-1/5  justify-around"
                >
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                    src={c?.image}
                    alt="actor profile"
                  />
                  <div className="flex flex-col">
                    <div> role as : {c?.roleAs}</div>
                    <div>name : {c?.name}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
    
<button onClick={()=>{
  setIsOpen(true);
}} id="add-review-btn" class="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
  Add Review
</button>

<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden" id="my-modal"></div>


<div class=" relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" id="modal-content">
  <div class="mt-3 text-center">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Add Your Review</h3>
    <div class="mt-2 px-7 py-3">
    
      <textarea class="form-textarea mt-1 block w-full" rows="3" placeholder="Your review"></textarea>
    </div>
    <div class="items-center px-4 py-3">
      <button class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
        Submit Review
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default SingleMoviePage;

const ActorCard = () => {
  return (
    <div className="d-flex border">
      {img && (
        <div>
          <img style={{ borderRadius: "10px" }} src={gsuysgx} alt="hi" />
        </div>
      )}
      <div>actor Name</div>
    </div>
  );
};
