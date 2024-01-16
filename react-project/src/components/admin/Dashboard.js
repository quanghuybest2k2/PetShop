import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [totalProduct, setProduct] = useState(null);
  const [totalCategory, setCategory] = useState(null);
  const [totalOrder, setOrder] = useState(null);
  const [totalComment, setComment] = useState(null);

  useEffect(() => {
    let isMounted = true;
    document.title = "Dashboard";

    axios.get(`view-dashboard`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.products);
          setCategory(res.data.category);
          setOrder(res.data.orders);
          setComment(res.data.comments);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      class: "col-xl-3 col-md-6 mb-4",
      color: "primary",
      icon: "fa fa-paw fa-2x text-gray-300",
      title: "Tổng thú cưng",
      value: totalProduct,
    },
    {
      class: "col-xl-3 col-md-6 mb-4",
      color: "success",
      icon: "fas fa-clipboard-list fa-2x text-gray-300",
      title: "Tổng loại thú cưng",
      value: totalCategory,
    },
    {
      class: "col-xl-3 col-md-6 mb-4",
      color: "info",
      icon: "fas fa-dollar-sign fa-2x text-gray-300",
      title: "Tổng đơn hàng",
      value: totalOrder,
    },
    {
      class: "col-xl-3 col-md-6 mb-4",
      color: "warning",
      icon: "fas fa-comments fa-2x text-gray-300",
      title: "Tổng bình luận",
      value: totalComment,
    },
  ];

  var viewDashboard_HTML = "";
  if (loading) {
    return <LoadingSpinner />;
  } else {
    viewDashboard_HTML = cards.map((card, index) => (
      <div
        key={index}
        class={`card border-left-${card.color} shadow h-100 py-2 ${card.class}`}
      >
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class={`text-xs font-weight-bold text-${card.color} text-uppercase mb-1`}
              >
                {card.title}
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                {card.value}
              </div>
            </div>
            <div class="col-auto">
              <i class={card.icon}></i>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div class="container-fluid">
      {/* <!-- Page Heading --> */}
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      {/* <!-- Content Row --> */}
      <div class="row">{viewDashboard_HTML}</div>
    </div>
  );
}
export default Dashboard;
