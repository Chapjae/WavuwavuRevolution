import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  return (
    <>
      <Link href='/'>Button Check</Link>
      <Link href='/practice'>Practice</Link>
    </>
  );
}
