import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/user-context/UserContext';
import './styles.css';

export const Feedback = () => {
  const userContext = useContext(UserContext);
  const userLogin = userContext.userLogin;
  const [userFeedback, setUserFeedback] = useState(userContext.userFeedback);
  const [feedbackRating, setFeedbackRating] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const userEmail = localStorage.getItem('user');
  const fetchUserData = async () => {
    await axios.post('http://localhost:5000/api/account/find-all-user-data', { email: userEmail }).then((response) => {
      setUserFeedback(response.data.user.feedback);
    }).catch((error) => { });
  };

  useEffect(() => {
    fetchUserData();
    setFeedbackRating('');
    setFeedbackComment('');
    setUserFeedback(false);
  }, [feedbackSuccess]);

  const handleOnSendFeedback = async () => {
    await axios.post('http://localhost:8080/api/feedback', { userEmail: userEmail, questionOne: feedbackRating, questionTwo: feedbackComment }).then((response) => {
    }).catch((error) => {});
    await axios.put('http://localhost:8080/api/feedback/user-give-feedback', { userEmail: userEmail }).then((response) => {
    });
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false)
    }, 3000);
    return
  }

  return (
    <div>
      {
        userLogin && !userFeedback &&
        <div className='feedback-wrapper'>
          <button type="button" className="btn btn-info feedback-button" data-bs-toggle="modal" data-bs-target="#feedbackModal">Feedback</button>
          <div className="modal fade" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="feedbackModalLabel">We want to hear from you!</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="feedback-rating-wrapper">
                      How did you like the experince with our App?<br />
                      <div className='center-rating'>
                        <span className='finger-style'>&#128078;</span>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Realy Bad" onClick={(e) => setFeedbackRating(e.currentTarget.value)} />
                          <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Bad" onClick={(e) => setFeedbackRating(e.currentTarget.value)} />
                          <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Not That Bad" onClick={(e) => setFeedbackRating(e.currentTarget.value)} />
                          <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="Good" onClick={(e) => setFeedbackRating(e.currentTarget.value)} />
                          <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="Realy Good" onClick={(e) => setFeedbackRating(e.currentTarget.value)} />
                          <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                        </div>
                        <span>&#128077;</span>
                      </div>
                    </div>
                      What would you improve on our App?<br />
                    <textarea type="text" className="form-control" placeholder="Tell us about it!" value={feedbackComment} onChange={(e) => setFeedbackComment(e.currentTarget.value)} /><br />
                    {
                      feedbackSuccess ?
                        <div className="alert alert-success" role="alert">
                          Thank You for your Feeback, it's important to us!
                        </div> : ''
                    }
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss={feedbackSuccess ? '' : "modal"} disabled={feedbackRating.length > 1 && feedbackComment.length > 1 ? false : true}
                    onClick={handleOnSendFeedback}
                    >Send Feedback</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}