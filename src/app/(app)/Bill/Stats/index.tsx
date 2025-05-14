import { StyleSheet, Text, View } from 'react-native';
import { get } from '../../../../config/api';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { getRoundNumber } from '../../../../components/utils/getRoundTotal';
import { theme } from '../../../../core/theme';

type StatDataFetch = { date: string; hour: string; total: number };
type FetchData = { total: StatDataFetch[]; sum: number; count: number };
type StatData = { date: string; hour: number; total: number };
type OtherStats = { sum: number; count: number };
const index = () => {
  const [statsData, setStatsDate] = useState<StatData[]>([]);
  const [otherStats, setOtherStats] = useState<OtherStats>({ sum: 0, count: 0 });
  const startDate = new Date().toISOString().split('T')[0];
  const fetchStats = async () => {
    const response = await get<FetchData>(`/api/cart/stats/${startDate}`);
    const formatReponse = response.data.total
      .map((res) => {
        return {
          date: new Date().toLocaleDateString(),
          hour: parseInt(res.hour.split(':')[0]) - new Date().getTimezoneOffset() / 60,
          total: getRoundNumber(res.total),
        };
      })
      .sort((a, b) => a.hour - b.hour);
    setStatsDate(formatReponse);
    setOtherStats({ sum: response.data.sum, count: response.data.count });
  };
  useEffect(() => {
    fetchStats();
  }, []);

  const data = statsData.map((stat) => ({
    value: stat.total,
    label: `${stat.hour}H`,
    date: stat.date,
  }));

  return (
    <View
      style={{
        paddingVertical: 100,
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        paddingTop: 50,
      }}
    >
      <View
        style={{
          paddingVertical: 30,
        }}
      >
        <LineChart
          curved
          areaChart
          data={data ? data : []}
          hideDataPoints
          spacing={50}
          width={350}
          height={250}
          color={theme.colors.violet}
          thickness={4}
          startFillColor={theme.colors.violet}
          endFillColor={theme.colors.violet}
          startOpacity={0.5}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={3}
          yAxisColor="black"
          xAxisColor="black"
          yAxisThickness={1}
          xAxisThickness={1}
          rulesType="solid"
          rulesColor="gray"
          pointerConfig={{
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items: { value: string; label: string; date: string }[]) => {
              const item = items?.[0];
              return (
                <View
                  style={{
                    height: 120,
                    width: 100,
                    paddingLeft: 16,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'black', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                    {item ? item.label : 'N/D'}{' '}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor: theme.colors.violet,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: theme.colors.white }}>
                      {item ? `€${item.value}` : '€0'}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
      <View style={styles.containerStats}>
        <View style={styles.boxStats}>
          <Text style={styles.titleBoxStats}>Total journée</Text>
          <Text style={styles.valueBoxStats}>{getRoundNumber(otherStats.sum)}€</Text>
        </View>
        <View style={styles.boxStats}>
          <Text style={styles.titleBoxStats}>Compte moyen</Text>
          <Text style={styles.valueBoxStats}>{getRoundNumber(otherStats.sum / otherStats.count)}€</Text>
        </View>
        <View style={styles.boxStats}>
          <Text style={styles.titleBoxStats}>Nombre compte</Text>
          <Text style={styles.valueBoxStats}>{getRoundNumber(otherStats.count)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStats: {
    marginTop: 50,
    flexWrap: 'wrap',
    gap: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  boxStats: {
    padding: 10,
    borderRadius: 8,
    height: 100,
    width: '45%',
    backgroundColor: theme.colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  titleBoxStats: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueBoxStats: { fontSize: 25, fontWeight: 'bold', color: theme.colors.white },
});

export default index;
