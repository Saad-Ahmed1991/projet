import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getALLServices } from "../../redux/Actions/serviceActions";
import ServiceCard from "../ServiceCard/ServiceCard";
import "./style.css";

const ServiceList = () => {
  const allServices = useSelector((state) => state.serviceReducer.allServices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getALLServices());
  }, []);

  return (
    <div className="serviceList">
      {allServices
        ? allServices.map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))
        : null}
    </div>
  );
};

export default ServiceList;
