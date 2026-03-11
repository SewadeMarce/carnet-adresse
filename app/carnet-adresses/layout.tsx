import { Outlet, redirect, useLoaderData, useParams } from "react-router";
import Header from "./ui/header";
import ContactList from "./ui/contact-liste";
import { useMobile } from "~/hooks/usehook";
import type { LoaderFunctionArgs } from "react-router";
import { getTotalContacts } from "~/lib/utils";
import { contactsStore } from "services/data.service";
import type { ContactType } from "types";

export async function loader({ request, context }: LoaderFunctionArgs) {

    const user = context.user;
    if (!user) {
        throw redirect("/auth");
    }

    const url = new URL(request.url);
    const q = url.searchParams.get('q') || "";

    const { contacts } = await contactsStore.search(user.id, q);

    const favoriteContacts = contacts?.filter((c:ContactType) => c.favorite);
    const regularContacts = contacts?.filter((c:ContactType) => !c.favorite);
    const totalContacts = getTotalContacts(contacts)
    return {
        filteredContacts: contacts,
        favoriteContacts,
        regularContacts,
        totalContacts

    }
}

export default function Layout() {
    const { isMobile } = useMobile()

    const {
        filteredContacts,
        favoriteContacts,
        regularContacts,
        totalContacts

    } = useLoaderData()
    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #fef9f8 100%)',
                fontFamily: '"Instrument Serif", serif',
            }}>

            {/* Header */}
            <Header totalContacts={totalContacts} />
            {/* Main Content */}

            <div
                style={{
                    maxWidth: '1400px', margin: '0 auto',
                    padding: isMobile ? '20px 16px' : '40px 60px',
                    display: isMobile ? 'block' : 'grid',
                    gridTemplateColumns: '1fr 1.2fr',
                    gap: '30px',
                    alignItems: 'start'
                }}>

                {/* Left Panel - Contact List */}
                <ContactList
                    favoriteContacts={favoriteContacts}
                    regularContacts={regularContacts}
                    filteredContacts={filteredContacts}
                />

                {/* Right Panel - Contact Detail */}
                <Outlet />

            </div>

            {/* Add/Edit Modal */}
            {/* {(showAddModal || editingContact) && (

            )} */}
        </div>
    );
};

