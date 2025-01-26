import React, {useEffect} from 'react';
import {getPolls, createPoll} from '../../actions/dashboard'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Dashboard = ({getPolls, createPoll, polls}) => {
    useEffect(() => {
        const loadPolls = async () => {
            try {
                await getPolls();
            } catch (error) {
                console.log('Помилка при отриманні опитувань:', error);
            }
        };
        loadPolls();
    }, [getPolls]);

    const onClick = async (el) => {
        el.preventDefault();

        try {
            await createPoll();
            await getPolls();
        } catch (error) {
            console.log('Error creating poll:', error);
        }
    };
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button className="btn" onClick={onClick}>Create new poll</button>

            {Array.isArray(polls) && polls.length > 0 ? (
                <div className="polls-list">
                    {polls.map((poll) => (
                        <div className="poll-card" key={poll.id}>
                            <h2 className="poll-title">{poll.title}</h2>
                            <p className="poll-date">{new Date(poll.createdAt).toLocaleDateString()}</p>
                            <ul className="poll-options">
                                {poll.options.map((option, index) => (
                                    <li key={index} className="poll-option">
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No polls available</p>
            )}
        </div>
    );
};

Dashboard.propTypes = {
    getPolls: PropTypes.func.isRequired,
    createPoll: PropTypes.func.isRequired,
    polls: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    polls: state.dashboard.polls
})


export default connect(mapStateToProps, {getPolls, createPoll})(Dashboard);