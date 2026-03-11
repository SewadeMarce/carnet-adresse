import { Heart } from "lucide-react";
import { useState } from "react";

export default function BtnFavorit({ favorite }: { favorite: boolean }) {

    const [isFavorit, setIsFavorit] = useState(favorite)
    //  const isFavorit = fetcher.formData ? !favorite : favorite;

    return (
        <>
            <input type="hidden" name="favorite" value={`${isFavorit}`} />
            <button type="button"
                onClick={() => setIsFavorit(!isFavorit)}
                className="button rounded-2xl" style={{
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: isFavorit ? '#ff6b9d' : '#aaa',
                    fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: '500'
                }}>
                {isFavorit ? 'Favori' : 'Ajouter aux favoris'}
                <Heart size={20} fill={isFavorit ? '#ff6b9d' : 'none'} className="favorite-icon" />
            </button>

        </>
    )
}