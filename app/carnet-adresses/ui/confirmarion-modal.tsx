
import { Delete, Save, Trash2, X } from 'lucide-react';
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { Form, useFetcher, useNavigate } from 'react-router';
import { useMobile } from '~/hooks/usehook';




export function DeleteButton({ open }: { open: Dispatch<SetStateAction<boolean>> }) {
  const { isMobile } = useMobile()
  const navigate = useNavigate();
 
  const fetcher = useFetcher()
  return <div
    className="modal-backdrop"
    style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center', zIndex: 1000, padding: isMobile ? '15px' : '20px'
    }}
  >
    <div
      className="modal-content" style={{
        background: 'white',
        borderRadius: isMobile ? '30px 30px 0 0' : '40px',
        padding: isMobile ? '30px 20px 40px' : '50px',
        maxWidth: isMobile ? '100%' : '600px',
        width: '100%',
        boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
        maxHeight: isMobile ? '90vh' : 'auto',
        overflowY: 'auto'
      }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '30px'
      }}>
        <h2 style={{
          fontSize: isMobile ? '26px' : '32px', fontWeight: '400',
          margin: 0, fontFamily: '"Instrument Serif", serif', color: '#2d2d2d'
        }}>
          Confirmation de Suppression
        </h2>
        <button
          onClick={() => open(false)}
          className="button" style={{
            background: 'transparent', border: '2px solid #f0f0f0', borderRadius: '25px', cursor: 'pointer',
            padding: '8px', color: '#aaa'
          }}>
          <X size={24} />

        </button>
      </div>
      <p className="p-10">
        Êtes-vous sûr de vouloir supprimer  ? Cette action est irréversible.
      </p>
      <fetcher.Form method="post">
        <input type="hidden" name="condition" value="delete" />
        <button
          type="submit"
          className="button"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
            color: 'white', border: 'none', padding: '16px', borderRadius: '28px',
            fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '10px',
            boxShadow: '0 8px 24px rgba(102,126,234,0.35)'
          }}
        >
          Oui
        </button>
      </fetcher.Form>
    </div>
  </div>

}