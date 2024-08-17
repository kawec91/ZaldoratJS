import React from 'react'
import KingdomsListCard from '../KingdomsListCard/KingdomsListCard'
import AvelonImg from '../../assets/images/avelon.jpg'
import TaladrimImg from '../../assets/images/taladrim.jpg'
import IsilvenImg from '../../assets/images/isilven.jpg'
import ArathImg from '../../assets/images/arath.jpg'

export default function KingdomsList() {
    const kingdoms = [
        {
            imgUrl: AvelonImg,
            title: "Królestwo Avelon",
            text: "Potężne i wspaniałe państwo położone w zachodniej części kontynentu., którego stolicą jest usytuowane na południowo zachodnim wybrzeżu Verentris. To królestwo znane jest z doskonałej organizacji, bogactwa oraz niepokonanej armii. Jego stolica, jest miastem legend, wypełnionym monumentalnymi pałacami i posągami. Na zachód od  miasta, tuż na wybrzeżu znajduje się starożytny labirynt, który pamięta jeszcze czasy pierwszych władców zachodu. Budowla ta popadła przez wieki w ruinę i przez to zyskała złą sławę. Mieszkańcy stolicy powiadają, iż w głębinach żyją potwory i inne straszne istoty, czekające tylko aż ktoś zabłąka się w te ciemne korytarze.",
        },
        {
            imgUrl: TaladrimImg,
            title: "Królestwo Taladrim",
            text: `To starożytne miasto, w dużej mierze zamieszkiwane przez Elfy Lasu. To piękne i tajemnicze miejsce pełne majestatycznych budowli wykonanych z marmuru i białego kamienia, często ozdobione ornamentami przypominającymi leśną roślinność.
                    Państwo to leży na skraju Puszczy Irmandir [ Rozległej [ rozciągającej się w północno wschodniej części Avelonu, będąc niezależną enklawą wewnątrz wielkiego królestwa ludzi. 
                    `,
        },
        {
            imgUrl: IsilvenImg,
            title: "Królestwo Isilven",
            text: `Zamieszkiwane przez odrębne plemię elfów, nazywane Elfami Morza, ze względu na ich zamiłowanie do żeglugi i umiejętności budowania wspaniałych okrętów.
                    Miasto położone jest na trzynastu wyspach leżących tuż u wybrzeża kontynentu. Wyspy oddzielone są wąskimi kanałami, a na największej z nich ma swój pałac król elfów. Pozostałymi wyspami zarządza 12 najpotężniejszych rodów. Miasto samo w sobie robi obronne wrażenie. Białe mury i wysokie wieże znane są na całym świecie, lecz to coś innego przyćmiewa białe budowle, bowiem największe rody wraz z władcą dosiadają potężnych smoków. To znacznie odstrasza każdego, kto choćby chciał przypuścić atak na piękne miasto.
                    `,
        },
        {
            imgUrl: ArathImg,
            title: "Królestwo Arath’lorn",
            text: `To królestwo krasnoludów, które leży w sercu Gór Barierowych. Krasnoludy są znane ze swojej wytrwałości, rzemiosła i umiejętności górniczych. Ich królestwo jest potężne, zbudowane z doskonałej jakości kamiennych fortyfikacji i rzeźbionych korytarzy, które ukrywają bogactwa i tajemnice. Królestwo Arath’lorn ma głębokie połączenie z górskimi pasmami, a krasnoludy cenią sobie ich dziedzictwo i piękno.
                    `,
        },
    ];
  return (
    <div className='flex items-center justify-center gap-4 flex-col'>
        {kingdoms.map((item, i) => <KingdomsListCard key={`${item.title}-${i}`}number={i} title={item.title} text={item.text} img={item.imgUrl} />)}
    </div>
  )
}
