import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const hideNavPaths = ['/', '/welcome', '/login', '/signup', '/otp', '/profile-setup', '/forgot-password'];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="w-full mx-auto min-h-screen bg-[#0a0e1a] relative shadow-2xl">
        <main className={`${showNav ? 'pb-20' : ''} min-h-screen`}>
          {children}
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );

//   return (
//     <div className="min-h-screen bg-neutral-900">
//       <div className="w-full min-h-screen bg-[#0a0e1a] shadow-2xl flex justify-center">

//         <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-5xl relative min-h-screen">

//           <main className={`${showNav ? 'pb-20' : ''} min-h-screen`}>
//             {children}
//           </main>

//           {showNav && <BottomNav />}
//         </div>

//       </div>
//     </div>
//   );
 }

// w-full mx-auto