import { redirect, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { useMobile } from "~/hooks/usehook";
import DetailCard from "../ui/detail-panel";
import { contactsStore } from "services/data.service";
export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id as string;
    const { contact } = await contactsStore.getById(id);
    if (!contact) throw new Response('contact non trouvé', { status: 404 });

    return contact
}
export async function action({ params, request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const id = params.id as string;
    const condition = formData.get('condition');

    if (condition === 'delete') {
        const res = await contactsStore.delete(id)
        console.log(res);

        throw redirect('/carnet-adresses')
    }
    if (condition === 'favorite') {
        const favorite = formData.get('favorite') === 'true'
        console.log({ favorite });
        const res = await contactsStore.pushFavorite(id, { favorite: !favorite })
        console.log(JSON.parse((JSON.stringify(res))));
    }


}
export default function Page() {
    const contact = useLoaderData()
    const { isMobile, mobileView } = useMobile()
    return <>
        {
            (!isMobile || mobileView === 'detail') && (
                <div
                    style={{
                        background: 'white', borderRadius: '30px',
                        padding: isMobile ? '25px 20px' : '50px',
                        boxShadow: '0 10px 50px rgba(0,0,0,0.06)',
                        minHeight: isMobile ? 'auto' : '500px',
                        animation: 'fadeInUp 0.6s ease-out 0.2s both'
                    }}>
                    <DetailCard c={contact} />
                </div>
            )
        }

    </>

};
