import React from 'react'

export default function LoginPage() {
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
                <li className="nav-item submenu dropdown">
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
                    <li className="nav-item">
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
                <li className="nav-item submenu dropdown active">
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
                    <li className="nav-item active">
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
            <h1>Login/Register</h1>
            <nav className="d-flex align-items-center">
              <a href="index.html">
                Home
                <span className="lnr lnr-arrow-right" />
              </a>
              <a href="category.html">Login/Register</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/* End Banner Area */}
    {/*================Login Box Area =================*/}
    <section className="login_box_area section_gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="login_box_img">
              <img className="img-fluid" src="img/login.jpg" alt="" />
              <div className="hover">
                <h4>New to our website?</h4>
                <p>
                  There are advances being made in science and technology
                  everyday, and a good example of this is the
                </p>
                <a className="primary-btn" href="registration.html">
                  Create an Account
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login_form_inner">
              <h3>Log in to enter</h3>
              <form
                className="row login_form"
                action="contact_process.php"
                method="post"
                id="contactForm"
              >
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Username"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Password"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <div className="creat_account">
                    <input type="checkbox" id="f-option2" name="selector" />
                    <label htmlFor="f-option2">Keep me logged in</label>
                  </div>
                </div>
                <div className="col-md-12 form-group">
                  <button type="submit" value="submit" className="primary-btn">
                    Log In
                  </button>
                  <a href="#">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*================End Login Box Area =================*/}
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
