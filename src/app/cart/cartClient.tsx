'use client';

import React, { useState, useEffect } from 'react';
import CartInner from './cartInner'; 

const CartClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) return null; 

  return <CartInner />;
};

export default CartClient;
