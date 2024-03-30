import React, { useState } from 'react';

function Faq() {
    const [selected, setSelected] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };

    const data = [
        {
            question: 'What types of events can be hosted on your platforms?',
            answer: 'Mosaic is a event promoting platform where all the college events are hosted/promoted through this framework.',
        },
        {
            question: 'How do I cancel the registered events?',
            answer: 'One should contact the respective colleges.',
        },
        {
            question: 'How do our college promote the events using your website/platform?',
            answer: 'Colleges can create their account through Mosaic,manage the event details,add the list of events available and update accordingly.',
        },
        {
            question: 'Are there any fees associated with promoting an event on your website?',
            answer: 'No.',
        },
        {
            question: 'Can I know the upcoming events of the associated colleges?',
            answer: 'The upcoming events may be displayed through the college accounts and the students will be updated for the same through the farmework.',
        },
        {
            question: 'How can I find events happening on my college campus?',
            answer: 'You can easily find events on your college campus by visiting the Mosaic website, and search for your college name you can get it there..!!',
        },
        {
            question: " I'm new to Mosaic. Can you walk me through how to use it? ",
            answer: 'Of course! To get started, you can visit the Mosaic website and browse through the events listed there. If you need personalized recommendations, you can log in or sign up.',
        },
        {
            question: 'Can I provide feedback or suggestions for improving Mosaic?',
            answer: 'Yes, we welcome feedback and suggestions for improving Mosaic! If you have any ideas or suggestions, please feel free to share them with us, and we ll take them into consideration for future updates.',
        },
        {
            question: 'How can I stay updated on the latest news and announcements from Mosaic?',
            answer: 'You can stay updated on the latest news and announcements from Mosaic by subscribing to our newsletter or following us on social media. We regularly share updates about new events, features, and more!',
        },
        {
            question: 'Can I share events from Mosaic with my friends?',
            answer: 'Absolutely! You can easily share events from Mosaic with your friends by using the social sharing buttons provided on the specific event. Spread the word and invite your friends to join in on the fun!',
        },
        
    ];

    return (
        <div className="faq-container">
            <div className={`accordion ${showAll ? 'show-all' : ''}`}>
                {data.map((item, i) => (
                    <div className="item" key={i}>
                        <div className="title" onClick={() => toggle(i)}>
                            <h3>{item.question}</h3>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={selected === i ? 'content show' : 'content'}>{item.answer}</div>
                    </div>
                ))}
            </div>
            {!showAll && (
                <button className="show-more" onClick={() => setShowAll(true)}>
                    Show More
                </button>
            )}
        </div>
    );
}

export default Faq;
