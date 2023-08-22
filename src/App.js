import './App.css';
import React, { useState, useRef } from 'react';
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

function App() {

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const ref = useRef(null);
  const [message, setMessage] = useState('');
  const modalName = () => {
    setMessage(ref.current.id);
  }

  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [teacher, setTeacher] = useState('');
  const formRef = useRef(null);
  const scriptUrl = "https://script.google.com/macros/s/AKfycbx17DWcJKLHo4azTy2usaDMAl1x3dsyuK8kYYhU1Ss9VrNmQMD1Nv33xcIj-8Nyi7IV/exec"

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeacher({ message });
    if (name =='' || num =='') {
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
            className='w-100 d-block'
            itemId={1}
            src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
            alt='...'
          >
            <MDBBtn color='warning'>Vote Your Favourite Teacher</MDBBtn>
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

        <div className='d-flex flex-wrap mt-4 justify-content-center'>
          {data.teachers.map(item => (
            <>
              <div className='m-2'>
                <MDBCard style={{ maxWidth: "300px" }} className='rounded-7 MDCard shadow-5'>
                  <MDBCardImage
                    src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                    alt='...'
                    position='top'
                    className='rounded-circle p-2 shadow-5 mx-auto' style={{ width: "12em", height: "12em" }}
                  />
                  <MDBCardBody style={{ marginTop: "-0.5em" }}>
                    <MDBListGroup flush>
                      <MDBListGroupItem className='text-center fw-bolder' >{item.name}</MDBListGroupItem>
                    </MDBListGroup>
                    <MDBCardText className='mt-2'>
                      This is a longer card with supporting text below as a natural lead-in to additional content.
                    </MDBCardText>
                  </MDBCardBody>
                  {/* <MDBCardFooter className='mx-auto'> */}
                  <MDBBtn color='warning w-50 mb-3 mx-auto' onClick={() => { toggleShow(); modalName(); }} ref={ref} id={item.name}>Vote Now</MDBBtn>
                  {/* </MDBCardFooter> */}
                </MDBCard>
              </div>
            </>
          ))}





          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Vote for {message}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <form onSubmit={handleSubmit} method='post' ref={formRef} name="google-sheet">
                  <MDBModalBody>
                    <MDBCardImage
                      src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                      alt='...'
                      position='top'
                      className='rounded-circle shadow-5 mx-auto mb-2 ' style={{ width: "12em", height: "12em", marginTop: "-0.5em" }}
                    />
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
      </div>

      <div className='text-warning py-1 pt-2 text-center m-auto' style={{backgroundColor:"grey"}}>
        <h6>© The Bhonsor carnival 2023</h6>
      </div>
    </>
  );
}

export default App;
