import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Phone, Mail, MapPin, Heart, Edit2, Trash2, X, Save, ArrowLeft } from 'lucide-react';
import Header from './ui/header';
import dataServices from 'server/services/data.service';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || ''
    const allContacts = await dataServices.getAllContacts(q);
    const favoriteContacts = allContacts.filter(c => c.favorite);
    const regularContacts = allContacts.filter(c => !c.favorite);

    return {
        allContacts,
        favoriteContacts,
        regularContacts,

    }

}
const AddressBookApp = () => {
   
    return (
        <div 
        style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: '100%', color: '#aaa', textAlign: 'center',
            padding: '40px'
        }}>
            <User size={80} style={{ marginBottom: '20px', opacity: 0.3 }} />
            <p style={{ fontFamily: '"Instrument Serif", serif', fontSize: '24px', margin: '0 0 10px 0', color: '#2d2d2d' }}>
                Sélectionnez un contact
            </p>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', fontWeight: '300' }}>
                Cliquez sur un contact pour voir ses détails
            </p>



        </div >
    );
};

export default AddressBookApp;


