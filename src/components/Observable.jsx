import { useRef, useEffect } from 'react';

const Observable = ({ setObserved }) => {

    const observableRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {

            // Check first observed element
            setObserved(entries?.[0]?.isIntersecting || false);

        }, { threshold: 1 }); // Trigger when whole element is in view

        if (observableRef.current) {
            observer.observe(observableRef.current);
        }

        // Clean up the observer when the component unmounts
        return () => {
            if (observableRef.current) {
                observer.unobserve(observableRef.current);
            }
        };
    }, []);

    return (
        <div ref={observableRef}></div>
    )
}

export default Observable;