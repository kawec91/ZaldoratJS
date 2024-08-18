import React from 'react'
import KingdomsListCard from '../KingdomsListCard/KingdomsListCard'
import AvelonImg from '../../assets/images/avelon.jpg'
import TaladrimImg from '../../assets/images/taladrim.jpg'
import IsilvenImg from '../../assets/images/isilven.jpg'
import ArathImg from '../../assets/images/arath.jpg'
import AhmerImg from '../../assets/images/ahmer.jpeg'
import EldorianImg from '../../assets/images/eldorian.jpeg'
import MoredaneImg from '../../assets/images/moredane.jpeg'
import SeraphonImg from '../../assets/images/seraphon.jpeg'
import RoztoczanskieImg from '../../assets/images/roztoczanskie.jpeg'
import HryzantiiImg from '../../assets/images/hryzantii.jpeg'

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
        {
            imgUrl: AhmerImg,
            title: "Imperium Ahmerów",
            text: `To państwo słynie z egzotycznej kultury, zamożności oraz mistycyzmu. Jego stolica, Arkhanthos, to miejsce pełne tajemniczych świątyń, wysokich piramid  i szkół magii, których niezbyt pochwala się praktyki w królestwach północy. Wielka stolica leży na południowo wschodnim wybrzeżu, będąc najbardziej wysuniętym tak dużym miastem na południe kontynentu.
                    Powierzchnia tego państwa wynosi około 4 000 000  kilometry kwadratowe. Dużą część kraju pokrywa pustynia Rahat-Meer [ gorąca Ziemia ]
                    Przez to, iż zajmuje całe południe, sąsiadów ma tylko na północy. Idąc od wschodu jest to Eldorian, Seraphon i na północnym zachodzie Avelon.
                    `,
        },
        {
            imgUrl: EldorianImg,
            title: "Królestwo Eldorian",
            text: `Słynie z pięknych lasów oraz kunsztu w sztuce łucznictwa. Jest to ziemia o bujnej roślinności i żyznych glebach, które sprzyjają rolnictwu i ogrodnictwu. Mieszkańcy Eldorianu są znani z dbałości o przyrodę i harmonię z otaczającym ich środowiskiem. Jednak królestwo to słynie jeszcze z chodowli wspaniałych koni, które uznaje się za jedne z najlepszych na świecie. Stolicą tego kraju jest miasto Valendria, zbudowana na morzu tuż nad wybrzeżem. Powierzchnia kraju wynosi około 380 000 kilometrów kwadratowych.
            `,
        },
        {
            imgUrl: MoredaneImg,
            title: "Królestwo Moredane",
            text: `Położone na północ od królestwa Seraphon i Eldorian. Charakteryzuje się nieco surowszym klimatem i wiecznie zielonymi iglastymi lasami. Jego mieszkańcy są twardymi i niezależnymi ludźmi, znani z umiejętności przetrwania w trudnych warunkach. Jego powierzchnia to 420 tysięcy kilometrów kwadratowych. Stolicą jest położona na wschodzie Ambera.
            `,
        },
        {
            imgUrl: SeraphonImg,
            title: "Królestwo Seraphon",
            text: `To malownicze królestwo położone na zachód od królestwa Eldorian. Znane jest z pięknych krajobrazów, rozległych bagien leżących w północnej części i imponujących zamków.
                Królestwo Seraphonu jest także siedliskiem potężnych czarodziejów mających swoją cytadelę w samej stolicy, którą jest miasto Rezanna, usytuowane w centralnej części kraju. Państwo to zajmuje około 350 tysięcy kilometrów kwadratowych powierzchni.
                `,
        },
        {
            imgUrl: RoztoczanskieImg,
            title: "Królestwo Roztoczańskie",
            text: `Barbarzyńska kraina zamieszkiwana przez silnych i dzikich wojowników, którzy dość często najeżdżają bandyckimi grupami północne pogranicza Avelonu. Stolica tego kraju to Razbadon. Położone jest w centralnej części królestwa, lecz to mało bezpieczne miejsce. Ziemie te mają około 500 tysięcy kilometrów kwadratowych powierzchni.
            `,
        },
        {
            imgUrl: HryzantiiImg,
            title: "Królestwo Hryzantii",
            text: `Tajemnicza i mroczna kraina, leżąca w północnej części Gór Barierowych, między Królestwem Roztoczańskim i Królestwem Moredane. Panuje tu nieposkromiona natura i czarnoksięska magia. Stolicą jest dość ponure miasto Drakmor o ciemnych murach, położone na wyżynie. Ziemie te liczą sobie 300 tysięcy kilometrów kwadratowych powierzchni.
            `,
        },
        {
            imgUrl: ArathImg,
            title: "Skalisty Kraniec",
            text: `Dzika kraina znajdująca się w sporej części na półwyspie, na północ i północny wschód od Królestwa Moredane. Zamieszkana jest przez tajemnicze plemiona i mityczne bestie, co znacząco odstrasza większość śmiałków chcących się tam wybrać. Liczy sobie blisko 700 tysięcy kilometrów kwadratowych powierzchni i zajmuje północno wschodnią część kontynentu.`,
        },
        {
            imgUrl: ArathImg,
            title: "Lodowy Zakątek",
            text: `To teren znany ze swojej niegościnnej zimy, gdzie lodowce i lodowe burze rządzą naturą, a ziemie te będące mroźną pustynią zajmują ponad 5 200 000 kilometrów kwadratowych. Kraina ta zajmuje całą północną część kontynentu i jest najbardziej niegościnnym miejscem znanym mieszkańcom południa.`,
        },
    ];
  return (
    <div className='flex items-center justify-center gap-4 flex-col'>
        {kingdoms.map((item, i) => <KingdomsListCard key={`${item.title}-${i}`}number={i} title={item.title} text={item.text} img={item.imgUrl} />)}
    </div>
  )
}
