import React from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, Switch } from '@mui/material';
import { styled } from '@mui/system';

const plans = [
  {
    title: 'Free',
    subtitle: 'Basic',
    description: 'For most businesses that want to optimize web queries',
    price: 'Free',
    features: [
      'All limited links',
      'Own analytics platform',
      'Chat support',
      'Optimize hashtags',
      'Unlimited users',
    ],
    buttonText: 'Try Now',
  },
  {
    title: 'Professional',
    subtitle: 'Advanced tools for precision farming',
    description: '',
    price: '$0.25/month',
    features: [
      'All limited links',
      'Own analytics platform',
      'Chat support',
      'Optimize hashtags',
      'Unlimited users',
    ],
    buttonText: 'Choose plan',
    popular: true,
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
  border: 'none',
  '&.popular': {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    border: `2px solid green`,
  },
}));

const PricingPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const handleBillingCycleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingCycle(event.target.checked ? 'yearly' : 'monthly');
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center', py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Choose the plan that’s right for you
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        No contracts. No surprise fees.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <Typography>Monthly</Typography>
        <Switch
          checked={billingCycle === 'yearly'}
          onChange={handleBillingCycleChange}
          color="primary"
        />
        <Typography>Yearly</Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <StyledCard variant="outlined" className={plan.popular ? 'popular' : ''}>
              <CardContent>
                {plan.popular && (
                  <Typography variant="overline" color="primary">
                    Most Popular
                  </Typography>
                )}
                <Typography variant="h6">{plan.title}</Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  {plan.price}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {plan.subtitle}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {plan.description}
                </Typography>
                <Box component="ul" sx={{ textAlign: 'left', paddingLeft: '1.25em', marginBottom: '1em' }}>
                  {plan.features.map((feature, idx) => (
                    <Typography key={idx} component="li" variant="body2">
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button variant="contained" color={plan.popular ? 'primary' : 'inherit'}>
                  {plan.buttonText}
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingPlans;
