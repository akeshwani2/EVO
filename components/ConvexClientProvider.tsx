export default function ConvexClientProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ConvexClientProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
      </ConvexClientProvider>
    );
  }
  