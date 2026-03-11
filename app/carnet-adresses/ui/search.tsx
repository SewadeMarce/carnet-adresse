import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigation, useSearchParams, type LoaderFunctionArgs } from "react-router";

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const navigation = useNavigation();

    const isSearch = new URLSearchParams(navigation.location?.search).has('q');

    function debounceFn() {

        if (searchQuery.trim()) setSearchParams({ q: searchQuery.trim() }, { replace: true });
        else setSearchParams({}, { replace: true })
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => debounceFn(), 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery, setSearchParams]);

    return (
        <div
            style={{

                marginBottom: '20px',
                position: 'relative'
            }}>
            <div
                style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}>
                {isSearch ? (<Loader2 size={18} className="animate-spin"
                    style={{
                        color: '#888'
                    }} />)
                    :
                    (<Search size={18}
                        style={{
                            color: '#888'
                        }} />)}
            </div>

            <input
                type="text"
                placeholder="Rechercher un contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={styles.contenair.Input}
            />
        </div>
    )
}


const contenair = {

    marginBottom: '20px',
    position: 'relative'
};

const styles = {
    contenair: {

        Input: {
            width: '100%', padding: '14px 18px 14px 46px',
            border: '2px solid #f0f0f0', borderRadius: '25px',
            fontSize: '14px', fontFamily: '"Inter", sans-serif',
            outline: 'none',
            //  background: '#fafafa'

        }
    }
}