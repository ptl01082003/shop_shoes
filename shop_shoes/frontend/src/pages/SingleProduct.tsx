import React from 'react'

export default function SingleProduct() {
  return (
<>
  {/* Start Header Area */}
  <header className="header_area sticky-header">
    <div className="main_menu">
      <nav className="navbar navbar-expand-lg navbar-light main_box">
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <a className="navbar-brand logo_h" href="index.html">
            <img src="img/logo.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className="collapse navbar-collapse offset"
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="index.html">
                  Home
                </a>
              </li>
              <li className="nav-item submenu dropdown active">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="category.html">
                      Shop Category
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="single-product.html">
                      Product Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="checkout.html">
                      Product Checkout
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="cart.html">
                      Shopping Cart
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="confirmation.html">
                      Confirmation
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item submenu dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Blog
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="blog.html">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="single-blog.html">
                      Blog Details
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item submenu dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="login.html">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="tracking.html">
                      Tracking
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="elements.html">
                      Elements
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item">
                <a href="#" className="cart">
                  <span className="ti-bag" />
                </a>
              </li>
              <li className="nav-item">
                <button className="search">
                  <span className="lnr lnr-magnifier" id="search" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div className="search_input" id="search_input_box">
      <div className="container">
        <form className="d-flex justify-content-between">
          <input
            type="text"
            className="form-control"
            id="search_input"
            placeholder="Search Here"
          />
          <button type="submit" className="btn" />
          <span
            className="lnr lnr-cross"
            id="close_search"
            title="Close Search"
          />
        </form>
      </div>
    </div>
  </header>
  {/* End Header Area */}
  {/* Start Banner Area */}
  <section className="banner-area organic-breadcrumb">
    <div className="container">
      <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
        <div className="col-first">
          <h1>Product Details Page</h1>
          <nav className="d-flex align-items-center">
            <a href="index.html">
              Home
              <span className="lnr lnr-arrow-right" />
            </a>
            <a href="#">
              Shop
              <span className="lnr lnr-arrow-right" />
            </a>
            <a href="single-product.html">product-details</a>
          </nav>
        </div>
      </div>
    </div>
  </section>
  {/* End Banner Area */}
  {/*================Single Product Area =================*/}
  <div className="product_image_area">
    <div className="container">
      <div className="row s_product_inner">
        <div className="col-lg-6">
          <div className="s_Product_carousel">
            <div className="single-prd-item">
              <img className="img-fluid" src="img/category/s-p1.jpg" alt="" />
            </div>
            <div className="single-prd-item">
              <img className="img-fluid" src="img/category/s-p1.jpg" alt="" />
            </div>
            <div className="single-prd-item">
              <img className="img-fluid" src="img/category/s-p1.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-1">
          <div className="s_product_text">
            <h3>Faded SkyBlu Denim Jeans</h3>
            <h2>$149.99</h2>
            <ul className="list">
              <li>
                <a className="active" href="#">
                  <span>Category</span> : Household
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Availibility</span> : In Stock
                </a>
              </li>
            </ul>
            <p>
              Mill Oil is an innovative oil filled radiator with the most modern
              technology. If you are looking for something that can make your
              interior look awesome, and at the same time give you the pleasant
              warm feeling during the winter.
            </p>
            <div className="product_count">
              <label htmlFor="qty">Quantity:</label>
              <input
                type="text"
                name="qty"
                id="sst"
                maxLength={12}
                defaultValue={1}
                title="Quantity:"
                className="input-text qty"
              />
              <button
                className="increase items-count"
                type="button"
              >
                <i className="lnr lnr-chevron-up" />
              </button>
              <button
                className="reduced items-count"
                type="button"
              >
                <i className="lnr lnr-chevron-down" />
              </button>
            </div>
            <div className="card_area d-flex align-items-center">
              <a className="primary-btn" href="#">
                Add to Cart
              </a>
              <a className="icon_btn" href="#">
                <i className="lnr lnr lnr-diamond" />
              </a>
              <a className="icon_btn" href="#">
                <i className="lnr lnr lnr-heart" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*================End Single Product Area =================*/}
  {/*================Product Description Area =================*/}
  <section className="product_description_area">
    <div className="container">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link"
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Specification
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Comments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active"
            id="review-tab"
            data-toggle="tab"
            href="#review"
            role="tab"
            aria-controls="review"
            aria-selected="false"
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <p>
            Beryl Cook is one of Britain’s most talented and amusing artists
            .Beryl’s pictures feature women of all shapes and sizes enjoying
            themselves .Born between the two world wars, Beryl Cook eventually
            left Kendrick School in Reading at the age of 15, where she went to
            secretarial school and then into an insurance office. After moving
            to London and then Hampton, she eventually married her next door
            neighbour from Reading, John Cook. He was an officer in the Merchant
            Navy and after he left the sea in 1956, they bought a pub for a year
            before John took a job in Southern Rhodesia with a motor company.
            Beryl bought their young son a box of watercolours, and when showing
            him how to use it, she decided that she herself quite enjoyed
            painting. John subsequently bought her a child’s painting set for
            her birthday and it was with this that she produced her first
            significant work, a half-length portrait of a dark-skinned lady with
            a vacant expression and large drooping breasts. It was aptly named
            ‘Hangover’ by Beryl’s husband and
          </p>
          <p>
            It is often frustrating to attempt to plan meals that are designed
            for one. Despite this fact, we are seeing more and more recipe books
            and Internet websites that are dedicated to the act of cooking for
            one. Divorce and the death of spouses or grown children leaving for
            college are all reasons that someone accustomed to cooking for more
            than one would suddenly need to learn how to adjust all the cooking
            practices utilized before into a streamlined plan of cooking that is
            more efficient for one person creating less
          </p>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <h5>Width</h5>
                  </td>
                  <td>
                    <h5>128mm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Height</h5>
                  </td>
                  <td>
                    <h5>508mm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Depth</h5>
                  </td>
                  <td>
                    <h5>85mm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Weight</h5>
                  </td>
                  <td>
                    <h5>52gm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Quality checking</h5>
                  </td>
                  <td>
                    <h5>yes</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Freshness Duration</h5>
                  </td>
                  <td>
                    <h5>03days</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>When packeting</h5>
                  </td>
                  <td>
                    <h5>Without touch of hand</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Each Box contains</h5>
                  </td>
                  <td>
                    <h5>60pcs</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <div className="row">
            <div className="col-lg-6">
              <div className="comment_list">
                <div className="review_item">
                  <div className="media">
                    <div className="d-flex">
                      <img src="img/product/review-1.png" alt="" />
                    </div>
                    <div className="media-body">
                      <h4>Blake Ruiz</h4>
                      <h5>12th Feb, 2018 at 05:56 pm</h5>
                      <a className="reply_btn" href="#">
                        Reply
                      </a>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
                <div className="review_item reply">
                  <div className="media">
                    <div className="d-flex">
                      <img src="img/product/review-2.png" alt="" />
                    </div>
                    <div className="media-body">
                      <h4>Blake Ruiz</h4>
                      <h5>12th Feb, 2018 at 05:56 pm</h5>
                      <a className="reply_btn" href="#">
                        Reply
                      </a>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
                <div className="review_item">
                  <div className="media">
                    <div className="d-flex">
                      <img src="img/product/review-3.png" alt="" />
                    </div>
                    <div className="media-body">
                      <h4>Blake Ruiz</h4>
                      <h5>12th Feb, 2018 at 05:56 pm</h5>
                      <a className="reply_btn" href="#">
                        Reply
                      </a>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="review_box">
                <h4>Post a comment</h4>
                <form
                  className="row contact_form"
                  action="contact_process.php"
                  method="post"
                  id="contactForm"
                
                >
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Full name"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        rows={1}
                        placeholder="Message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      value="submit"
                      className="btn primary-btn"
                    >
                      Submit Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show active"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab"
        >
          <div className="row">
            <div className="col-lg-6">
              <div className="row total_rate">
                <div className="col-6">
                  <div className="box_total">
                    <h5>Overall</h5>
                    <h4>4.0</h4>
                    <h6>(03 Reviews)</h6>
                  </div>
                </div>
                <div className="col-6">
                  <div className="rating_list">
                    <h3>Based on 3 Reviews</h3>
                    <ul className="list">
                      <li>
                        <a href="#">
                          5 Star <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" /> 01
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          4 Star <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" /> 01
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          3 Star <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" /> 01
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          2 Star <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" /> 01
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          1 Star <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" /> 01
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="review_list">
                <div className="review_item">
                  <div className="media">
                    <div className="d-flex">
                      <img src="img/product/review-1.png" alt="" />
                    </div>
                    <div className="media-body">
                      <h4>Blake Ruiz</h4>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
                <div className="review_item">
                  <div className="media">
                    <div className="d-flex">
                      <img src="img/product/review-2.png" alt="" />
                    </div>
                    <div className="media-body">
                      <h4>Blake Ruiz</h4>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
                <div className="review_item">
                  <div className="media">
                    <div className="d-flex">
                      <img src="img/product/review-3.png" alt="" />
                    </div>
                    <div className="media-body">
                      <h4>Blake Ruiz</h4>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="review_box">
                <h4>Add a Review</h4>
                <p>Your Rating:</p>
                <ul className="list">
                  <li>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                  </li>
                </ul>
                <p>Outstanding</p>
                <form
                  className="row contact_form"
                  action="contact_process.php"
                  method="post"
                  id="contactForm"
                
                >
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Full name"
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        placeholder="Phone Number"
                     
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        rows={1}
                        placeholder="Review"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      value="submit"
                      className="primary-btn"
                    >
                      Submit Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================End Product Description Area =================*/}
  {/* Start related-product Area */}
  <section className="related-product-area section_gap_bottom">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <div className="section-title">
            <h1>Deals of the Week</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r1.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r2.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r3.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r5.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r6.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r7.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r9.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r10.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single-related-product d-flex">
                <a href="#">
                  <img src="img/r11.jpg" alt="" />
                </a>
                <div className="desc">
                  <a href="#" className="title">
                    Black lace Heels
                  </a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="ctg-right">
            <a href="#" target="_blank">
              <img
                className="img-fluid d-block mx-auto"
                src="img/category/c5.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End related-product Area */}
  {/* start footer Area */}
  <footer className="footer-area section_gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-3  col-md-6 col-sm-6">
          <div className="single-footer-widget">
            <h6>About Us</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-lg-4  col-md-6 col-sm-6">
          <div className="single-footer-widget">
            <h6>Newsletter</h6>
            <p>Stay update with our latest</p>
            <div className="" id="mc_embed_signup">
              <form
                target="_blank"
                action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                method="get"
                className="form-inline"
              >
                <div className="d-flex flex-row">
                  <input
                    className="form-control"
                    name="EMAIL"
                    placeholder="Enter Email"
                    type="email"
                  />
                  <button className="click-btn btn btn-default">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </button>
                  <div style={{ position: "absolute", left: "-5000px" }}>
                    <input
                      name="b_36c4fd991d266f23781ded980_aefe40901a"
                      tabIndex={-1}
                      defaultValue=""
                      type="text"
                    />
                  </div>
                  {/* <div class="col-lg-4 col-md-4">
												<button class="bb-btn btn"><span class="lnr lnr-arrow-right"></span></button>
											</div>  */}
                </div>
                <div className="info" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3  col-md-6 col-sm-6">
          <div className="single-footer-widget mail-chimp">
            <h6 className="mb-20">Instragram Feed</h6>
            <ul className="instafeed d-flex flex-wrap">
              <li>
                <img src="img/i1.jpg" alt="" />
              </li>
              <li>
                <img src="img/i2.jpg" alt="" />
              </li>
              <li>
                <img src="img/i3.jpg" alt="" />
              </li>
              <li>
                <img src="img/i4.jpg" alt="" />
              </li>
              <li>
                <img src="img/i5.jpg" alt="" />
              </li>
              <li>
                <img src="img/i6.jpg" alt="" />
              </li>
              <li>
                <img src="img/i7.jpg" alt="" />
              </li>
              <li>
                <img src="img/i8.jpg" alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div className="single-footer-widget">
            <h6>Follow Us</h6>
            <p>Let us be social</p>
            <div className="footer-social d-flex align-items-center">
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
              <a href="#">
                <i className="fa fa-dribbble" />
              </a>
              <a href="#">
                <i className="fa fa-behance" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
        <p className="footer-text m-0">
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          Copyright © All rights reserved | This template is made with{" "}
          <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
          <a href="https://colorlib.com" target="_blank" rel="noreferrer">
            Colorlib
          </a>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        </p>
      </div>
    </div>
  </footer>
  {/* End footer Area */}
  {/*gmaps Js*/}
</>

  )
}
