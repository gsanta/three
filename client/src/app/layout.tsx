const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body style={{ height: '100vh' }}>{children}</body>
    </html>
  );
};

export default RootLayout;
