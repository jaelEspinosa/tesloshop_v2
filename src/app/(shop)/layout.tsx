
import { Sidebar } from '@/components';
import { TopMenu } from '../../components/ui/top-menu/TopMenu';


export default function ShopLayout({children}: {
    children: React.ReactNode;
}){
    return (
        <main className="min-h-screen">
            <TopMenu />
            <Sidebar />
            <div className='px-1 sm:px-7'>
              {children}
            </div>
        </main>
    );
}
