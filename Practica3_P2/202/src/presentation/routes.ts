import { Router } from 'express';

import { StudentRoutes  } from './estudiante/routes';
import { TutorRoutes  } from './tutor/routes';
import { TutoredRoutes } from './tutorado/routes';
import { ReasonRoutes } from './motivo/routes';
import { TutorshipRoutes } from './tutoria/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/students', StudentRoutes.routes );
    router.use('/api/tutors', TutorRoutes.routes );
    router.use('/api/tutoreds', TutoredRoutes.routes );
    router.use('/api/reasons', ReasonRoutes.routes );
    router.use('/api/tutorships', TutorshipRoutes.routes );
    
    return router;
  }


}

