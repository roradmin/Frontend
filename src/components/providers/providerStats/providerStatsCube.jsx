import React,{useState,useEffect} from 'react';
import { getMiniStatsForProvider } from '../../../apiConnector/provider.api';
import TopBox from '../../dashboard/topBox';
import { LoaderCircle } from '../../common/loader/loader';

export const StatsCube = ({currentProvider,query}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [boxData,setBoxData] = useState(null);

    useEffect(() => {
        getProviderMiniStats();
    },[]);

    const getProviderMiniStats = async() => {
        try{
            setIsLoading(true);
            const {data:{data}} = await getMiniStatsForProvider({
                providerId: currentProvider.id,
                query: query.query
            });
            setBoxData({label: query.label, value: data});
        }
        catch(err){
            console.error(err);
        }
        finally{
            setIsLoading(false);
        }
    }
    return <TopBox color={'#eee'}>
        {isLoading ? <LoaderCircle width='70px' height='70px' /> :
        <><div className='result'>
            <span className='value'>{boxData?.value ?? '#?'}</span>
            {boxData?.label && <span className='label'>{boxData?.label}</span>}
        </div>
        <span className='description'>{query?.description}</span></>}
    </TopBox>
}

