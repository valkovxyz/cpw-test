import React, { useState, useEffect } from 'react';

interface INotificationProps {
  text: string;
}

export const Notification: React.FC<INotificationProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4700);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible]);

  return (
    <div className={`notification ${isVisible ? 'visible' : ''}`}>
      <div className="line"></div>
      <p className={'notification_text'}>{text} </p>
    </div>
  );
};