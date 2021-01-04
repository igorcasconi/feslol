import React from 'react'
import { Link } from '@material-ui/core'

import { Row, Text } from 'components'

interface BreadcrumbProps {
  previousRoute: string
  currentRoute: string
  urlPreviousRoute: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ previousRoute, currentRoute, urlPreviousRoute }) => (
  <Row width='100%'>
    <Row mr='12px'>
      <Link href={urlPreviousRoute}>
        <Text color='#47A2E3' fontSize={20}>
          {previousRoute}
        </Text>
      </Link>
    </Row>

    <Row mr='12px'>
      <Text color='#262626' fontSize={20}>
        {'>'}
      </Text>
    </Row>

    <Text color='#262626' fontSize={20}>
      {currentRoute}
    </Text>
  </Row>
)

export default Breadcrumb
