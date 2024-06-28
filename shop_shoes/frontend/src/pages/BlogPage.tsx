import React from 'react'

export default function BlogPage() {
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
              <li className="nav-item submenu dropdown active">
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
                  <li className="nav-item active">
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
          <h1>Blog Page</h1>
          <nav className="d-flex align-items-center">
            <a href="index.html">
              Home
              <span className="lnr lnr-arrow-right" />
            </a>
            <a href="category.html">Blog</a>
          </nav>
        </div>
      </div>
    </div>
  </section>
  {/* End Banner Area */}
  {/*================Blog Categorie Area =================*/}
  <section className="blog_categorie_area">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="categories_post">
            <img src="img/blog/cat-post/cat-post-3.jpg" alt="post" />
            <div className="categories_details">
              <div className="categories_text">
                <a href="blog-details.html">
                  <h5>Social Life</h5>
                </a>
                <div className="border_line" />
                <p>Enjoy your social life together</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="categories_post">
            <img src="img/blog/cat-post/cat-post-2.jpg" alt="post" />
            <div className="categories_details">
              <div className="categories_text">
                <a href="blog-details.html">
                  <h5>Politics</h5>
                </a>
                <div className="border_line" />
                <p>Be a part of politics</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="categories_post">
            <img src="img/blog/cat-post/cat-post-1.jpg" alt="post" />
            <div className="categories_details">
              <div className="categories_text">
                <a href="blog-details.html">
                  <h5>Food</h5>
                </a>
                <div className="border_line" />
                <p>Let the food be finished</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================Blog Categorie Area =================*/}
  {/*================Blog Area =================*/}
  <section className="blog_area">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="blog_left_sidebar">
            <article className="row blog_item">
              <div className="col-md-3">
                <div className="blog_info text-right">
                  <div className="post_tag">
                    <a href="#">Food,</a>
                    <a className="active" href="#">
                      Technology,
                    </a>
                    <a href="#">Politics,</a>
                    <a href="#">Lifestyle</a>
                  </div>
                  <ul className="blog_meta list">
                    <li>
                      <a href="#">
                        Mark wiens
                        <i className="lnr lnr-user" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        12 Dec, 2018
                        <i className="lnr lnr-calendar-full" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        1.2M Views
                        <i className="lnr lnr-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        06 Comments
                        <i className="lnr lnr-bubble" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="blog_post">
                  <img src="img/blog/main-blog/m-blog-1.jpg" alt="" />
                  <div className="blog_details">
                    <a href="single-blog.html">
                      <h2>Astronomy Binoculars A Great Alternative</h2>
                    </a>
                    <p>
                      MCSE boot camps have its supporters and its detractors.
                      Some people do not understand why you should have to spend
                      money on boot camp when you can get the MCSE study
                      materials yourself at a fraction.
                    </p>
                    <a href="single-blog.html" className="white_bg_btn">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </article>
            <article className="row blog_item">
              <div className="col-md-3">
                <div className="blog_info text-right">
                  <div className="post_tag">
                    <a href="#">Food,</a>
                    <a className="active" href="#">
                      Technology,
                    </a>
                    <a href="#">Politics,</a>
                    <a href="#">Lifestyle</a>
                  </div>
                  <ul className="blog_meta list">
                    <li>
                      <a href="#">
                        Mark wiens
                        <i className="lnr lnr-user" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        12 Dec, 2018
                        <i className="lnr lnr-calendar-full" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        1.2M Views
                        <i className="lnr lnr-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        06 Comments
                        <i className="lnr lnr-bubble" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="blog_post">
                  <img src="img/blog/main-blog/m-blog-2.jpg" alt="" />
                  <div className="blog_details">
                    <a href="single-blog.html">
                      <h2>The Basics Of Buying A Telescope</h2>
                    </a>
                    <p>
                      MCSE boot camps have its supporters and its detractors.
                      Some people do not understand why you should have to spend
                      money on boot camp when you can get the MCSE study
                      materials yourself at a fraction.
                    </p>
                    <a href="single-blog.html" className="white_bg_btn">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </article>
            <article className="row blog_item">
              <div className="col-md-3">
                <div className="blog_info text-right">
                  <div className="post_tag">
                    <a href="#">Food,</a>
                    <a className="active" href="#">
                      Technology,
                    </a>
                    <a href="#">Politics,</a>
                    <a href="#">Lifestyle</a>
                  </div>
                  <ul className="blog_meta list">
                    <li>
                      <a href="#">
                        Mark wiens
                        <i className="lnr lnr-user" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        12 Dec, 2018
                        <i className="lnr lnr-calendar-full" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        1.2M Views
                        <i className="lnr lnr-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        06 Comments
                        <i className="lnr lnr-bubble" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="blog_post">
                  <img src="img/blog/main-blog/m-blog-3.jpg" alt="" />
                  <div className="blog_details">
                    <a href="single-blog.html">
                      <h2>The Glossary Of Telescopes</h2>
                    </a>
                    <p>
                      MCSE boot camps have its supporters and its detractors.
                      Some people do not understand why you should have to spend
                      money on boot camp when you can get the MCSE study
                      materials yourself at a fraction.
                    </p>
                    <a href="single-blog.html" className="white_bg_btn">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </article>
            <article className="row blog_item">
              <div className="col-md-3">
                <div className="blog_info text-right">
                  <div className="post_tag">
                    <a href="#">Food,</a>
                    <a className="active" href="#">
                      Technology,
                    </a>
                    <a href="#">Politics,</a>
                    <a href="#">Lifestyle</a>
                  </div>
                  <ul className="blog_meta list">
                    <li>
                      <a href="#">
                        Mark wiens
                        <i className="lnr lnr-user" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        12 Dec, 2018
                        <i className="lnr lnr-calendar-full" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        1.2M Views
                        <i className="lnr lnr-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        06 Comments
                        <i className="lnr lnr-bubble" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="blog_post">
                  <img src="img/blog/main-blog/m-blog-4.jpg" alt="" />
                  <div className="blog_details">
                    <a href="single-blog.html">
                      <h2>The Night Sky</h2>
                    </a>
                    <p>
                      MCSE boot camps have its supporters and its detractors.
                      Some people do not understand why you should have to spend
                      money on boot camp when you can get the MCSE study
                      materials yourself at a fraction.
                    </p>
                    <a href="single-blog.html" className="white_bg_btn">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </article>
            <article className="row blog_item">
              <div className="col-md-3">
                <div className="blog_info text-right">
                  <div className="post_tag">
                    <a href="#">Food,</a>
                    <a className="active" href="#">
                      Technology,
                    </a>
                    <a href="#">Politics,</a>
                    <a href="#">Lifestyle</a>
                  </div>
                  <ul className="blog_meta list">
                    <li>
                      <a href="#">
                        Mark wiens
                        <i className="lnr lnr-user" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        12 Dec, 2018
                        <i className="lnr lnr-calendar-full" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        1.2M Views
                        <i className="lnr lnr-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        06 Comments
                        <i className="lnr lnr-bubble" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="blog_post">
                  <img src="img/blog/main-blog/m-blog-5.jpg" alt="" />
                  <div className="blog_details">
                    <a href="single-blog.html">
                      <h2>Telescopes 101</h2>
                    </a>
                    <p>
                      MCSE boot camps have its supporters and its detractors.
                      Some people do not understand why you should have to spend
                      money on boot camp when you can get the MCSE study
                      materials yourself at a fraction.
                    </p>
                    <a href="single-blog.html" className="white_bg_btn">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </article>
            <nav className="blog-pagination justify-content-center d-flex">
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" aria-label="Previous">
                    <span aria-hidden="true">
                      <span className="lnr lnr-chevron-left" />
                    </span>
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    01
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#" className="page-link">
                    02
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    03
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    04
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    09
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link" aria-label="Next">
                    <span aria-hidden="true">
                      <span className="lnr lnr-chevron-right" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="blog_right_sidebar">
            <aside className="single_sidebar_widget search_widget">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Posts"
                />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <i className="lnr lnr-magnifier" />
                  </button>
                </span>
              </div>
              {/* /input-group */}
              <div className="br" />
            </aside>
            <aside className="single_sidebar_widget author_widget">
              <img
                className="author_img rounded-circle"
                src="img/blog/author.png"
                alt=""
              />
              <h4>Charlie Barber</h4>
              <p>Senior blog writer</p>
              <div className="social_icon">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-github" />
                </a>
                <a href="#">
                  <i className="fa fa-behance" />
                </a>
              </div>
              <p>
                Boot camps have its supporters andit sdetractors. Some people do
                not understand why you should have to spend money on boot camp
                when you can get. Boot camps have itssuppor ters andits
                detractors.
              </p>
              <div className="br" />
            </aside>
            <aside className="single_sidebar_widget popular_post_widget">
              <h3 className="widget_title">Popular Posts</h3>
              <div className="media post_item">
                <img src="img/blog/popular-post/post1.jpg" alt="post" />
                <div className="media-body">
                  <a href="blog-details.html">
                    <h3>Space The Final Frontier</h3>
                  </a>
                  <p>02 Hours ago</p>
                </div>
              </div>
              <div className="media post_item">
                <img src="img/blog/popular-post/post2.jpg" alt="post" />
                <div className="media-body">
                  <a href="blog-details.html">
                    <h3>The Amazing Hubble</h3>
                  </a>
                  <p>02 Hours ago</p>
                </div>
              </div>
              <div className="media post_item">
                <img src="img/blog/popular-post/post3.jpg" alt="post" />
                <div className="media-body">
                  <a href="blog-details.html">
                    <h3>Astronomy Or Astrology</h3>
                  </a>
                  <p>03 Hours ago</p>
                </div>
              </div>
              <div className="media post_item">
                <img src="img/blog/popular-post/post4.jpg" alt="post" />
                <div className="media-body">
                  <a href="blog-details.html">
                    <h3>Asteroids telescope</h3>
                  </a>
                  <p>01 Hours ago</p>
                </div>
              </div>
              <div className="br" />
            </aside>
            <aside className="single_sidebar_widget ads_widget">
              <a href="#">
                <img className="img-fluid" src="img/blog/add.jpg" alt="" />
              </a>
              <div className="br" />
            </aside>
            <aside className="single_sidebar_widget post_category_widget">
              <h4 className="widget_title">Post Catgories</h4>
              <ul className="list cat-list">
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Technology</p>
                    <p>37</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Lifestyle</p>
                    <p>24</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Fashion</p>
                    <p>59</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Art</p>
                    <p>29</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Food</p>
                    <p>15</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Architecture</p>
                    <p>09</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Adventure</p>
                    <p>44</p>
                  </a>
                </li>
              </ul>
              <div className="br" />
            </aside>
            <aside className="single-sidebar-widget newsletter_widget">
              <h4 className="widget_title">Newsletter</h4>
              <p>
                Here, I focus on a range of items and features that we use in
                life without giving them a second thought.
              </p>
              <div className="form-group d-flex flex-row">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Enter email"
                  />
                </div>
                <a href="#" className="bbtns">
                  Subcribe
                </a>
              </div>
              <p className="text-bottom">You can unsubscribe at any time</p>
              <div className="br" />
            </aside>
            <aside className="single-sidebar-widget tag_cloud_widget">
              <h4 className="widget_title">Tag Clouds</h4>
              <ul className="list">
                <li>
                  <a href="#">Technology</a>
                </li>
                <li>
                  <a href="#">Fashion</a>
                </li>
                <li>
                  <a href="#">Architecture</a>
                </li>
                <li>
                  <a href="#">Fashion</a>
                </li>
                <li>
                  <a href="#">Food</a>
                </li>
                <li>
                  <a href="#">Technology</a>
                </li>
                <li>
                  <a href="#">Lifestyle</a>
                </li>
                <li>
                  <a href="#">Art</a>
                </li>
                <li>
                  <a href="#">Adventure</a>
                </li>
                <li>
                  <a href="#">Food</a>
                </li>
                <li>
                  <a href="#">Lifestyle</a>
                </li>
                <li>
                  <a href="#">Adventure</a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================Blog Area =================*/}
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
