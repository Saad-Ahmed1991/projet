import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getALLServices } from "../../redux/Actions/serviceActions";
import ServiceCard from "../ServiceCard/ServiceCard";
import service_header from "../../assets/service_header.png";
import "./style.css";

const ServiceList = () => {
  const city = useSelector((state) => state.serviceReducer.city);
  const rating = useSelector((state) => state.serviceReducer.rating);
  const allServices = useSelector(
    (state) => state.serviceReducer.allServices
  ).filter(
    (service) =>
      service.profile.city.includes(city.toLowerCase()) &&
      service.totalRating / service.ratingNumber >= rating
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getALLServices("", "", 0));
  }, []);

  return (
    <div>
      <div>
        <img className="service_header" src={service_header} alt="" />
      </div>
      <div className="serviceList">
        {allServices
          ? allServices.map((service) => (
              <ServiceCard service={service} key={service._id} />
            ))
          : null}
      </div>
    </div>
  );
};

export default ServiceList;
