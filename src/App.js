import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import {
  MDBBtn,
  MDBCarousel,
  MDBCarouselItem,
  MDBInput,
  // MDBInputGroup,
  MDBCard,
  MDBCardBody,
  // MDBCardFooter,
  MDBCardText,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
// import { FcSearch } from 'react-icons/fc'
import { TbSend } from 'react-icons/tb'
import data from './data.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import bgImg from './img/Vote For MOST LOVED TEACHER OF BHONSOR.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';




function App() {

  var width = window.screen.width;

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const ref = useRef(null);
  const [message, setMessage] = useState('');
  const modalName = (e) => {
    setMessage(ref.current.id);
  }

  const [ipAddress, setIPAddress] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))
  }, []);
  // console.log(ipAddress)

  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [teacher, setTeacher] = useState('');
  const formRef = useRef(null);
  const scriptUrl = "https://script.google.com/macros/s/AKfycbx17DWcJKLHo4azTy2usaDMAl1x3dsyuK8kYYhU1Ss9VrNmQMD1Nv33xcIj-8Nyi7IV/exec"

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeacher({ message });
    if (name === '' || num === '') {
      alert("Please enter all the fields!");
    }
    else {
      fetch(scriptUrl, {
        method: 'POST',
        'mode': 'no-cors',
        body: new FormData(formRef.current),

      }).then(res => {
        alert('Thanks for Voting!😄');
      })
        .catch(err => console.log(err));
      setNum('');
      setName('');
      toggleShow();
    }
  }

  return (
    <>
      <div>
        <MDBCarousel>
          <MDBCarouselItem
            className='w-100 d-block bgImg'
            itemId={1}
            src={bgImg}
            alt='...'
          >
            {/* <MDBBtn color='warning'>Vote Your Favourite Teacher</MDBBtn> */}
          </MDBCarouselItem>
        </MDBCarousel>
      </div>


      <div className='voting m-3 text-center mt-5'>
        <h1>Vote for your Favourite Teacher</h1>
        {/* <div className='votingInp mx-auto my-4'>
          <MDBInputGroup className='mb-3'>
            <MDBInput className='form-control' label="Search your Teacher" type='text' />
            <MDBBtn outline><FcSearch size={20} /></MDBBtn>
          </MDBInputGroup>
        </div> */}

        {width < 670 ?
          <Swiper
            spaceBetween={50}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper mt-4 pb-4"
            cubeEffect={true}
            autoplay={true}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}

          >
            {data.teachers.map(item => (
              <>
                <SwiperSlide className='swiper-slide'>
                  <div className='m-2 d-flex justify-content-center'>
                    <MDBCard style={{ width: "270px" }} className='rounded-7 MDCard shadow-5'>
                      <MDBCardImage
                        src={require(`${item.img}`)}
                        alt='...'
                        position='top'
                        className='rounded-circle p-2 shadow-5 mx-auto' style={{ width: "12em", height: "12em" }}
                      />
                      <MDBCardBody style={{ marginTop: "-0.5em" }}>
                        <MDBListGroup flush>
                          <MDBListGroupItem className='text-center fw-bolder' >{item.name}</MDBListGroupItem>
                        </MDBListGroup>
                        <MDBCardText className='mt-2'>
                          {item.scl}
                        </MDBCardText>
                      </MDBCardBody>
                      {/* <MDBCardFooter className='mx-auto'> */}
                      <MDBBtn color='warning w-50 mb-3 mx-auto' onClick={() => { toggleShow(); modalName(); }} ref={ref} id={item.name}>Vote Now</MDBBtn>
                      {/* </MDBCardFooter> */}
                    </MDBCard>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
          :
          <div className='d-flex flex-wrap mt-4 justify-content-center'>
            {data.teachers.map(item => (
              <>
                <div className='m-2'>
                  <MDBCard style={{ width: "270px" }} className='rounded-7 MDCard shadow-5'
                    data-aos="zoom-in-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out">
                    <MDBCardImage
                      src={require(`${item.img}`)}
                      alt='...'
                      position='top'
                      className='rounded-circle p-2 shadow-5 mx-auto' style={{ width: "12em", height: "12em" }}
                    />
                    <MDBCardBody style={{ marginTop: "-0.5em" }}>
                      <MDBListGroup flush>
                        <MDBListGroupItem className='text-center fw-bolder' >{item.name}</MDBListGroupItem>
                      </MDBListGroup>
                      <MDBCardText className='mt-2'>
                        {item.scl}
                      </MDBCardText>
                    </MDBCardBody>
                    {/* <MDBCardFooter className='mx-auto'> */}
                    <MDBBtn color='warning w-50 mb-3 mx-auto' onClick={() => { toggleShow(); modalName(); }} ref={ref} id={item.name}>Vote Now</MDBBtn>
                    {/* </MDBCardFooter> */}
                  </MDBCard>
                </div>
              </>
            ))}
          </div>

        }






        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Vote for {message}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <form onSubmit={handleSubmit} method='post' ref={formRef} name="google-sheet">
                <MDBModalBody>
                  {/* <MDBCardImage
                    src={require(`${mimg}`)}
                    alt='...'
                    position='top'
                    className='rounded-circle shadow-5 mx-auto mb-2 ' style={{ width: "12em", height: "12em", marginTop: "-0.5em" }}
                  /> */}
                  <div className='my-2'>
                    <MDBInput label='Your Name' id='form1' type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='my-2 mt-3'>
                    <MDBInput label='Your Number' id='form1' type='number' name='number' value={num} onChange={(e) => setNum(e.target.value)} />
                  </div>
                  <div className='my-2 mt-3'>
                    <MDBInput
                      label="Teacher's Name"
                      id='formControlReadOnly'
                      type='text'
                      readOnly
                      name='teacher'
                      value={message}
                      onChange={(e) => setTeacher(e.target.value)}
                    />
                  </div>
                  <div style={{display:"none"}}>
                  <MDBInput
                      label="ip Address"
                      id='formControlReadOnly'
                      type='text'
                      readOnly
                      name='ip'
                      value={ipAddress}
                      // onChange={(e) => setTeacher(e.target.value)}
                    />
                    </div>


                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn color='secondary' onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn onSubmit={handleSubmit}>Submit&nbsp;&nbsp;<TbSend size={20} /></MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>

      <div className='py-1 pt-2 text-center m-auto' style={{ backgroundColor: "grey" }}>
        <h6 style={{ color: "yellow" }}>© <a style={{ color: "yellow" }} href='https://www.instagram.com/thebhonsorcarnival/'>The Bhonsor carnival 2023</a></h6>
      </div>
    </>
  );
}

export default App;
