import { useFetch } from 'hooks/useFetch';
import { endpoints } from 'services/Service';
import { useGlobalContext } from 'context/useGlobalContext';
import { CustomForm, MessageFound, Cards } from 'components';

function PrincipalPage() {
  const { data, loading, error } = useFetch(endpoints.characters);

  const { foundCharacter } = useGlobalContext();

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-2">Descubre tu Personaje!!</h1>

      <MessageFound foundCharacter={foundCharacter} />

      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full md:w-[30%] min-h-[300px] bg-[#05002C] flex justify-center" id="column1">
          <CustomForm />
        </div>
        <div className="w-full md:w-[70%] min-h-[300px] background-primary flex flex-wrap gap-2" id="column2">
          <Cards data={data || { results: [] }} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default PrincipalPage;
