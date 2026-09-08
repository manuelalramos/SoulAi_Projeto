import fotoLena from "../assets/media/foto_lena.jpeg";
import fotoLyvia from "../assets/media/foto_lyvia.jpeg";
import fotoManuela from "../assets/media/foto_manuela.jpg";
import fotoYasmin from "../assets/media/foto_yasmin.jpeg";

import type { TeamMember } from "../types/team";


export const teamMembers: TeamMember[] = [
    {
        name: "Lena Haidar Halawi",
        rm: "572258",
        className: "1TDSPG",
        photo: fotoLena,
        github: "https://github.com/Lenahalawi07",
        linkedin: "https://www.linkedin.com/in/lena-haidar-halawi-09134a3b8",
    },
    {
        name: "Lyvia Correa Amorim",
        rm: "569851",
        className: "1TDSPG",
        photo: fotoLyvia,
        github: "https://github.com/lyviaamorim",
        linkedin: "https://www.linkedin.com/in/lyvia-correa-de-amorim-0203493b8/",
    },
    {
        name: "Manuela de Lima Ramos",
        rm: "572956",
        className: "1TDSPG",
        photo: fotoManuela,
        github: "https://github.com/manuelalramos",
        linkedin: "https://www.linkedin.com/in/manuelalramos",
    },
    {
        name: "Yasmin Souza Silva Martins",
        rm: "572102",
        className: "1TDSPG",
        photo: fotoYasmin,
        github: "https://github.com/yasminmartins18",
        linkedin: "https://www.linkedin.com/in/yasmin-souza-silva-martins-32085b376",
    },
];